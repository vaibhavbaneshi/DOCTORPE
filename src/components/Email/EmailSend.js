import emailjs from '@emailjs/browser';

export async function sendDoctor (email, username, callIdString) {
    const message = `Greetings Dr. ${username}! A patient wants to consult to you virtually. The Call Id is: ${callIdString} and the link to the meeting is: https://online-meet-rosy.vercel.app/`;

    console.log(email, username, callIdString);

    const para = {
      to_name: username,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
    
    const serviceID = "service_zqj7cp8";
    const tempID = "template_lmuyngf";

    console.log('hi there again');
  
    await emailjs
      .send(serviceID, tempID, para,{
        publicKey: 'DFenNDhLvNQ3XzPVC'
      })
      .then((res) => {
        console.log('response: ', res);
      })
      .catch((err) => {
        console.log(err);
      });
}

export function sendPatient(email, username, callIdString) {
    const message = `Greetings ${username}! your online meeting Call Id is: <strong><u>${callIdString}</u></strong>`;

    const messageOptions = {
      to_name: username,
      from_name: "DoctorPe Team",
      email: email,
      message: message,
    };
  
    const serviceID = "service_zqj7cp8";
    const tempID = "template_lmuyngf";
  
    emailjs
      .send(serviceID, tempID, messageOptions,{
        publicKey: 'DFenNDhLvNQ3XzPVC'
      })
      .then((res) => {
        console.log(res);
        console.log("hi there");
      })
      .catch((err) => {
        console.log(err);
      });
}
