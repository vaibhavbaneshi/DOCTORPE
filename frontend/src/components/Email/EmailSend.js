import emailjs from '@emailjs/browser';

export async function sendDoctorConsult(email, username, callIdString) {
    const message = `Greetings! Dr. ${username}. A patient wants to consult to you virtually. The link to the meeting is: https://online-meet-rosy.vercel.app/ and the Call Id is: `;

    const para = {
      to_name: username,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
      link: callIdString
    };
    
    const serviceID = "service_egvis7l"
    const tempID="template_7h2lkff"
  
    await emailjs
      .send(serviceID, tempID, para,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .then((res) => {
        console.log('response: ', res);
      })
      .catch((err) => {
        console.log(err);
      });
}

export async function sendDoctorBook(email, fullname, patientName, date, time) {
    const message = `Greetings! Dr. ${fullname}. You have an appointment with : ${patientName} on Date : ${date} Time : ${time}`;

    const para = {
      to_name: fullname,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
    
    const serviceID = "service_egvis7l"
    const tempID="template_7h2lkff"
  
    await emailjs
      .send(serviceID, tempID, para,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .then((res) => {
        console.log('response: ', res);
      })
      .catch((err) => {
        console.log(err);
      });
}

export function sendPatientConsult(email, username, callIdString) {
    const message = `Greetings! ${username} your online meeting Call Id is: `;

    const messageOptions = {
      to_name: username,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
      link: callIdString
    };
  
    const serviceID = "service_egvis7l"
    const tempID="template_7h2lkff"
  
    emailjs
      .send(serviceID, tempID, messageOptions,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}

export function sendPatientBook(email, fullname, doctorName, date, time) {
    const message = `Greetings! ${fullname} your appointment with Dr. ${doctorName} is schedule on Date : ${date} Time : ${time}`;

    const messageOptions = {
      to_name: fullname,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
  
    const serviceID = "service_egvis7l"
    const tempID="template_7h2lkff"
  
    emailjs
      .send(serviceID, tempID, messageOptions,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}

export const sendDelivery = (fullname, email, totalItems, totalAmount) => {
  const message = `Greetings! ${fullname} your order of total items : ${totalItems} and total amount of : ₹ ${totalAmount} has been placed.`;

    const messageOptions = {
      to_name: fullname,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
  
    const serviceID = "service_egvis7l"
    const tempID="template_7h2lkff"
  
    emailjs
      .send(serviceID, tempID, messageOptions,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .catch((err) => {
        console.log(err);
      });
}
