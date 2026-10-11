import nodemailer from "nodemailer";

const getTransport = () => {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) return null;

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user, pass },
    });
};

export const sendAppointmentEmails = async ({
    patientEmail,
    patientName,
    doctorEmail,
    doctorName,
    date,
    time,
}) => {
    const transport = getTransport();
    if (!transport) {
        return { ok: false, reason: "not_configured" };
    }

    const from = process.env.SMTP_FROM || `"DoctorPe" <${process.env.SMTP_USER}>`;

    await transport.sendMail({
        from,
        to: patientEmail,
        subject: "Your DoctorPe appointment is confirmed",
        text: `Hi ${patientName},\n\nYour visit with Dr. ${doctorName} is scheduled for ${date} at ${time}.\n\nThis is an automated reminder, not medical advice.`,
    });

    await transport.sendMail({
        from,
        to: doctorEmail,
        subject: "New DoctorPe appointment",
        text: `Hi Dr. ${doctorName},\n\n${patientName} booked an appointment on ${date} at ${time}.`,
    });

    return { ok: true };
};
