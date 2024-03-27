import emailjs from '@emailjs/browser';

export async function sendDoctor (email, username, callIdString) {
    const message = `Greetings Dr. ${username}! A patient wants to consult to you virtually. The link to the meeting is: https://online-meet-rosy.vercel.app/ and the Call Id is: `;

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

export function sendPatient(email, username, callIdString) {
    const message = `Greetings ${username}! your online meeting Call Id is: `;

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
