import { useState } from 'react'
import './DoctorLcation.css'
import { useNavigate } from 'react-router-dom'

const initLocations = [
    {
        place: "Raipur",
        city: "Raipur"
    },
    {
        place: "Delhi",
        city: "Delhi"
    },
    {
        place: "Indore",
        city: "Indore"
    },
    {
        place: "Sapna Sangeeta",
        city: "Indore"
    },
    {
        place: "Ab Road",
        city: "Indore"
    },
    {
        place: "Lig Colony",
        city: "Indore"
    },
    {
        place: "Sudama Nagar",
        city: "Indore"
    },
]

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

export const DoctorLocation = ({ handleLocationClick }) => {

    const [locationResultHidden, setLocationResultHidden] = useState(true);
    const [searchLocation, setSearchLocation] = useState('');
    const [locations, setLocations] = useState(initLocations);
bn
    return <div className="home-search-container">
        <div className="location-search-box">
            <img src={'../../../images/home_location_icon.svg'} alt="" width="22" />
            <input type="text" className="search-location-input-box" placeholder="Search location" onFocus={() => setLocationResultHidden(false)} onBlur={() => setLocationResultHidden(true)} value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
            <div className="search-location-input-results" hidden={locationResultHidden}>
                {
                    locations.map(location => <div className="search-location-result-item" key={location.place} onClick={handleLocationClick} onMouseDown={() => setSearchLocation(location.place)}>
                        <span><img src={'../../../images/search.svg'} alt="" width="12" /></span>
                        <span><div>{location.place}</div><div>{location.city}</div></span>
                    </div>)
                }
            </div>
        </div>
    </div>
}