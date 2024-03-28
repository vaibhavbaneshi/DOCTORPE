import { Appointment } from "../model/appointment.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


export const bookAppointment = AsyncHandler( async (req, res) => {
    const {doctorId, date, time} = req.body

    const slotAvailable = await isSlotAvailable(doctorId, date, time);

    if (slotAvailable) {
        await createAppointment( doctorId, date, time);
        return res.json({
            msg: "Appointment booked successfully.",
            date,
            time,
            status: true
        })
    } else {
        return res.json({
            msg: "Appointment slot not available. Please choose another slot.",
            date,
            time,
            status: false
        })
    }
})

async function isSlotAvailable(doctorId, date, time) {
    const appointment = await Appointment.findOne({
        doctorId,
        date,
        time
    });
    return appointment ? false : true;
}

async function createAppointment(doctorId, date, time) {
    const appointment = {
        doctorId,
        date,
        time
    };
    await Appointment.create(appointment);
}

export const fetchAppointment = AsyncHandler(async (req, res) => {
    const appointments = await Appointment.find()

    res.json(appointments)
})

export const deleteAppointment = AsyncHandler( async (req, res) => {
    const {appointmentId} = req.body

    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    // Return a success message or any other relevant response
    return res.status(200).json({ message: 'Appointment deleted successfully' });
})