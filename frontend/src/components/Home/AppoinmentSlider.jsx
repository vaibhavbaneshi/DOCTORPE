import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './AppoinmentSlider.css'
import { AppointmentCard } from "./AppoinmentCard";

export const AppoinmentSlider = () => {
    const settings={
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    }
        
    return (
        <div className="slider-container ">
            <Slider {...settings}>
            <div>
                <AppointmentCard image="/images/design/services-bento.png" title="Dentist" sub="Teething troubles? Schedule a dental checkup" />
            </div>

            <div>
                <AppointmentCard image="/images/period.svg" title="Gynecologist/Obstetrician" sub="Explore for women's health, pregnancy and infertility treatments" />
            </div>
            
            <div>
                <AppointmentCard image="/images/pain.svg" title="Physiotherapist" sub="Pulled a muscle? Get it treated by a trained physiotherapist" />
            </div>

            <div>
                <AppointmentCard image="/images/fever.svg" title="General surgeon" sub="Need to get operated? Find the right surgeon" />
            </div>

            <div>
                <AppointmentCard image="/images/home_pediatric.svg" title="Orthopedist" sub="For Bone and Joints issues, spinal injuries and more" />
            </div>                
            </Slider>      
        </div>
    );
}