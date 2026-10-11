import { Appointment } from "../model/appointment.model.js";
import { Doctor } from "../model/doctor.model.js";
import { User } from "../model/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { sendAppointmentEmails } from "../utils/mail.js";

const parseAppointmentSlot = (date, time) => {
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const meridiem = match[3].toUpperCase();
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    const slot = new Date(`${date}T00:00:00`);
    slot.setHours(hours, minutes, 0, 0);
    return slot;
};

const todayIsoDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${date}`;
};

export const bookAppointment = AsyncHandler( async (req, res) => {
    const {doctorId, date, time} = req.body

    if (!doctorId || !date || !time) {
        return res.status(400).json({
            message: "doctorId, date and time are required",
            status: false
        })
    }

    const slotAt = parseAppointmentSlot(date, time);
    if (!slotAt || slotAt <= new Date()) {
        return res.status(400).json({
            message: "Choose a date and time in the future",
            status: false,
        });
    }

    const existing = await Appointment.findOne({ doctorId, date, time });

    if (existing) {
        return res.status(409).json({
            message: "Appointment slot not available. Please choose another slot.",
            date,
            time,
            status: false
        })
    }

    await Appointment.create({
        doctorId,
        date,
        time,
        userId: req.userId,
    });

    let emailSent = false;
    try {
        const [patient, doctor] = await Promise.all([
            User.findById(req.userId).select("email firstName lastName"),
            Doctor.findById(doctorId).select("email fullname"),
        ]);
        if (patient?.email && doctor?.email) {
            const result = await sendAppointmentEmails({
                patientEmail: patient.email,
                patientName: `${patient.firstName} ${patient.lastName}`.trim(),
                doctorEmail: doctor.email,
                doctorName: doctor.fullname,
                date,
                time,
            });
            emailSent = result.ok;
        }
    } catch (err) {
        console.warn("Appointment email failed:", err.message);
    }

    return res.json({
        message: "Appointment booked successfully.",
        date,
        time,
        status: true,
        emailSent,
    })
})

export const fetchAppointment = AsyncHandler(async (req, res) => {
    await Appointment.deleteMany({ date: { $lt: todayIsoDate() } });
    const appointments = await Appointment.find().select("doctorId date time")
    res.json(appointments)
})

export const deleteAppointment = AsyncHandler( async (req, res) => {
    const {appointmentId} = req.body

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.userId && String(appointment.userId) !== String(req.userId)) {
        return res.status(403).json({ message: "Not allowed to delete this appointment" });
    }

    await appointment.deleteOne();

    return res.status(200).json({ message: 'Appointment deleted successfully' });
})
