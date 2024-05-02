import './HomePage.css'
import { AppoinmentSlider } from '../../components/Home/AppoinmentSlider'
import { ArticleCard } from '../../components/Home/ArticleCard'
import { ConsultCard } from '../../components/Home/ConsultCard'
import { FacilityCard } from '../../components/Home/FacilityCard'
import { useNavigate } from "react-router-dom"
import ChatBotButton from '../../components/ChatBot/ChatBotButton'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const HomePage = () => {

    const navigate = useNavigate()
    const [tokenPresent, setTokenPresent] = useState(false);

    const handleFacilityCardNavigate1 = () => {

        if (!tokenPresent) {
            window.location.href = '/signin'
        } else {
            navigate("/searchDoctor");
        }
    }
    const handleFacilityCardNavigate2 = () => {

        if (!tokenPresent) {
            window.location.href = '/signin'
        } else {
            navigate("/bookDoctor");
        }
    }
    const handleFacilityCardNavigate3 = () => {

        if (!tokenPresent) {
            window.location.href = '/signin'
        } else {
            navigate("/medicines");
        }
    }
    const handleFacilityCardNavigate4 = () => {

        if (!tokenPresent) {
            window.location.href = '/signin'
        } else {
            navigate('/Ai_Lab');
        }
    }

    useEffect(() => {
        axios.put(`https://doctorpe-backend.vercel.app/api/v1/product/updateAllProductQuantity`)
        const token = localStorage.getItem('token');

        if(token) {
            setTokenPresent(true);
        } 
    }, []);

    return <div className="homepage-container pt-20">
            
        <section className="home-banner">
            <div className="home-banner-left">
                <div className="home-banner-practo-care w-32 text-white font-bold text-6xl">
                    <h1>Doctorपे</h1>
                </div>
                <p>Choose the experts in end to end health care.</p>
                <p>You are in safe hands</p>
            </div>
            <div className="home-banner-right -mt-1">
                <img className='' src={'../../../images/banner.png'} alt="banner" />
            </div>
        </section>
        <section className="home-facilities">            
            <FacilityCard image={'https://img.freepik.com/free-vector/videocalling-with-therapist_23-2148512091.jpg?t=st=1710310880~exp=1710314480~hmac=3235fb4fbc085f03ad735d5fd8e00930b2967ce3ec5ed49036a687dbb117a299&w=996'} background="#fff" title="Instant Video Consultation" sub="Connect within 60 secs" onClick={handleFacilityCardNavigate1}/>
            <FacilityCard image={'https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg?t=st=1710310332~exp=1710313932~hmac=574f7ed3a46a5c650583dd7dcce078ca8e3b7d8a9d1922d4c9eb55f903e3570b&w=996'} background="#fff" title="Find Doctors Near You" sub="Confirmed appoinments" onClick={handleFacilityCardNavigate2} />
            <FacilityCard image={'https://img.freepik.com/free-vector/courier-delivering-medications-patient-using-online-tracking-pills-tablets-fast-contactless-home-delivery-using-web-app-first-aid-healthcare-concept-cartoon-flat-illustration_74855-20517.jpg?w=900&t=st=1710309939~exp=1710310539~hmac=f6204cabb5ce3b57877a098cb79c93971e9009b0a7454b7cb1fd32c25320fb7c'} background="#fff" title="Medicines" sub="Essentials at your doorstep" onClick={handleFacilityCardNavigate3} />
            <FacilityCard image={'https://img.freepik.com/free-vector/chemist-concept-illustration_114360-13532.jpg?t=st=1710310724~exp=1710314324~hmac=68502080931ce540ad05a5254714de1a1d2bb49f2d145fb79016aebb72a18af5&w=740'} background="#fff" title="AI Lab" sub="Check you health status" onClick={handleFacilityCardNavigate4}/>
        </section>
        <section className="home-consult">
            <h2>Consult top doctors online for any health concern</h2>
            <p>Private online consultations with verified doctors in all spedialties</p>
            <div className="home-consult-card-container">
                <ConsultCard title="Period doubts or Pregnancy" image={'images/period.svg'} link={"/searchDoctor"}/>
                <ConsultCard title="Acne, pimple or skin issues" image={'images/acne.jpg'} link={"/searchDoctor"}/>
                <ConsultCard title="Headache, joint pain" image={'images/pain.svg'} link={"/searchDoctor"}/>
                <ConsultCard title="Cold, cough or fever" image={'images/fever.svg'} link={"/searchDoctor"} />
                <ConsultCard title="Child not feeling well" image={'images/childnotwell.svg'} link={"/searchDoctor"}/>
                <ConsultCard title="Depression or anxiety" image={'images/depression.svg'} link={"/searchDoctor"}/>
            </div>
        </section>
        <section className="home-appoinments">
            <h2>Book an appointment for an in-clinic consultation</h2>
            <h3>Find experienced doctors across all specialties</h3>
            <AppoinmentSlider />
        </section>
        <section className="home-top-articles">
            <div className="home-top-articles-info">
                <h2>Read top articles from health experts</h2>
                <p>Health articles that keep you informed about good health practices and achieve your goals.</p>
                <button onClick={() => window.location.href = "https://jamanetwork.com/journals/jama"} className="button button-primary">See all articles</button>
            </div>
            <ArticleCard image="https://www.practostatic.com/fit/5fd27b74d9477cb633445cf3f105078bbc479910" category="coronavirus" title="12 Coronavirus Myths and Facts That You Should Be Aware Of" sub="Dr. Diana Borgio" />
            <ArticleCard image="https://www.practostatic.com/fit/bade52edc7fb158bf627216bf96c2b881a97f30c" category="Vitamins and supplements" title="Eating Right to Build Immunity Against Cold and Viral Infections" sub="Dr. Diana Borgio" />

            <div className=''>
                <ChatBotButton />
            </div>
        </section>
    </div>
}