import emailjs from '@emailjs/browser';

export function sendDoctor(email, username, callIdString) {
    const message = `Greetings ${username}! A patient wants to consult to you virtually. The Call Id is: ${callIdString} and the link to the meeting is: https://online-meet-rosy.vercel.app/`;

    const para = {
      to_name: username,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
  
    const serviceID = "service_dvkx1ee";
    const tempID = "template_7vl5nlm";
  
    emailjs
      .send(serviceID, tempID, para,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}

export function sendPatient(email, username, callId) {
    const callIdString = callId.toString(); // Convert callId to string

    const message = `Greetings ${username}! your online meeting Call Id is: <strong><u>${callIdString}</u></strong>`;

    const para = {
      to_name: username,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
  
    const serviceID = "service_egvis7l";
    const tempID = "template_7h2lkff";
  
    emailjs
      .send(serviceID, tempID, para,{
        publicKey: '7B2itpD6d0z4vkdgv'
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}
