import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Heading from '../../components/products/Heading.jsx';
import "./AiLab.css"
import { FiMousePointer } from "react-icons/fi";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";

const Example = () => {
  return (
    <div className="flex flex-col items-center justify-items-center w-full h-screen bg-gradient-to-br from-slate-100 to-cyan-100   px-4 py-12 ">
      <div className="text-2xl font-medium font-serif ">
      <Heading title="Ai Health Checkup" preText={'Our'}/>
      </div>
      <div className="flex p-10 pt-10 w-full h-full justify-around">
      <TiltCard text="Diabetes Prediction" link="/Diabetes" image="https://img.freepik.com/free-vector/private-dentistry-abstract-concept-vector-illustration-private-dental-service-dentistry-clinic-healthcare-insurance-teeth-health-emergency-dentist-make-appointment-abstract-metaphor_335657-4055.jpg?t=st=1712677243~exp=1712680843~hmac=700e23840b31048be0b044ba87032cb7e570481c3024f28a2f3181d1f609ec5a&w=740"/>
      <TiltCard text="Heart Health Prediction"link="/Heart_Health" image="https://img.freepik.com/free-vector/medical-insurance-life-assurance-cardiac-arrest-heart-stop-heartache-idea-design-element-health-protection-contract-arrhythmia-diagnosis-vector-isolated-concept-metaphor-illustration_335657-1515.jpg?t=st=1712677007~exp=1712680607~hmac=279aecc2793eb000c337ed01b1b5afc12392a39ae4f0054bd93829d455cc5043&w=740"/>
      <TiltCard text="Stress Prediction" link="/Stress_Prediction" image="https://img.freepik.com/free-vector/psychologist-service-abstract-concept-vector-illustration-private-psychologist-session-mental-health-service-family-psychology-children-therapy-relationship-psychotherapy-abstract-metaphor_335657-4095.jpg?t=st=1712677113~exp=1712680713~hmac=ee046ca40d83241bf35d7d13eb732d4e29fa63c9e75e2e73b98971d7d83613cb&w=740"/>
      </div>
      <div>
          <ChatBotButton />
      </div>
     </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

// Card
const TiltCard = ({text,link,image}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={`/AI_Lab${link}`} className="flex items-center justify-center">
      <div className="transition flex items-center justify-center duration-400 ease-in-out transform hover:scale-105">
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        
      }}
      className="motion-div flex flex-col items-center justify rounded-2xl p-4 "
    >
      <div className="AiCard flex justify-center items-center  rounded-2xl  shadow-lg  ">
        <img className="AiCard-img rounded-2xl mt-1" src={image} alt="image" />
      </div>
      <p className="AiCard text-center text-xl font-bold pt-6 hover-scale-105"  >
          {text}
        </p>
    </motion.div>
    </div>
    </Link>
  );
};

export default Example;