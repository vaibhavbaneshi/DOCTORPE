import emailjs from '@emailjs/browser';

export function send(email, username) {

    const message = `Greetings ${username}! A patient wants to consult to you virtually: https://online-meet-rosy.vercel.app/`;

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
