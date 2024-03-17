// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './AppoinmentSlider.css'
import { AppointmentCard } from "./AppoinmentCard";

export const AppoinmentSlider = () => {
    
        
    return (
        <div className="flex appoinments-slider-container">
            
            <div>
                <AppointmentCard image="https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dentist@2x.jpg" title="Dentist" sub="Teething troubles? Schedule a dental checkup" />
            </div>

            <div>
                <AppointmentCard image="https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-gynecologist@2x.jpg" title="Gynecologist/Obstetrician" sub="Explore for women's health, pregnancy and infertility treatments" />
            </div>
            
            <div>
                <AppointmentCard image="https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-physiotherapist@2x.jpg" title="Physiotherapist" sub="Pulled a muscle? Get it treated by a trained physiotherapist" />
            </div>

            <div>
                <AppointmentCard image="https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-general-surgeon@2x.jpg" title="General surgeon" sub="Need to get operated? Find the right surgeon" />
            </div>

            <div>
                <AppointmentCard image="https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-orthopedist@2x.jpg" title="Orthopedist" sub="For Bone and Joints issues, spinal injuries and more" />
            </div>                
                
        </div>
    );
}