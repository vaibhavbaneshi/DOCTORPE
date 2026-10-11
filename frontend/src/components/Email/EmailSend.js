import emailjs from "@emailjs/browser";

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const emailConfigured = Boolean(serviceID && templateID && publicKey);

const sendMail = async (params) => {
    if (!emailConfigured) {
        return { ok: false, skipped: true };
    }
    try {
        const res = await emailjs.send(serviceID, templateID, params, { publicKey });
        return { ok: true, res };
    } catch (err) {
        // shortcut: EmailJS Gmail OAuth expires — reconnect in EmailJS dashboard or disable env vars
        console.warn("Email notification skipped:", err?.text || err?.message || err);
        return { ok: false, skipped: false, error: err };
    }
};

export async function sendDoctorConsult(email, username, callIdString) {
    const message = `Greetings! Dr. ${username}. A patient wants to consult you virtually. Meeting link: https://online-meet-rosy.vercel.app/ Call ID: `;
    return sendMail({
        to_name: username,
        from_name: "DoctorPe Team",
        email,
        message,
        link: callIdString,
    });
}

export async function sendDoctorBook(email, fullname, patientName, date, time) {
    const message = `Greetings! Dr. ${fullname}. You have an appointment with ${patientName} on ${date} at ${time}.`;
    return sendMail({
        to_name: fullname,
        from_name: "DoctorPe Team",
        email,
        message,
    });
}

export async function sendPatientConsult(email, username, callIdString) {
    const message = `Greetings! ${username}, your online meeting Call ID is: `;
    return sendMail({
        to_name: username,
        from_name: "DoctorPe Team",
        email,
        message,
        link: callIdString,
    });
}

export async function sendPatientBook(email, fullname, doctorName, date, time) {
    const message = `Greetings! ${fullname}, your appointment with Dr. ${doctorName} is scheduled on ${date} at ${time}.`;
    return sendMail({
        to_name: fullname,
        from_name: "DoctorPe Team",
        email,
        message,
    });
}

export const sendDelivery = (fullname, email, totalItems, totalAmount) => {
    const message = `Greetings! ${fullname}, your order of ${totalItems} item(s) for ₹${totalAmount} has been placed.`;
    return sendMail({
        to_name: fullname,
        from_name: "DoctorPe Team",
        email,
        message,
    });
};
