import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DoctorLocation.css'

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

export const DoctorLocation = ({ handleLocationSelectChange }) => {

    const [locationResultHidden, setLocationResultHidden] = useState(true);
    const [searchLocation, setSearchLocation] = useState('');
    const [locations, setLocations] = useState(initLocations);

    return <div className="home-search-container">
                <div className="location-search-box">
                    <img className="rounded-md bg-slate-200 pr-1" src={'../../../images/home_location_icon.svg'} alt="" width="32" />
                    <input type="text" className="search-location-input-box rounded-md" placeholder="Search location" onFocus={() => setLocationResultHidden(false)} onBlur={() => setLocationResultHidden(true)} value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
                    <div className="search-location-input-results" hidden={locationResultHidden}>
                        {
                            locations.map(location => (
                                <div className="search-location-result-item " key={location.place} onMouseDown={() => setSearchLocation(location.place)}>
                                    <span>
                                        <img src={'../../../images/search.svg'} alt="" width="20" />
                                    </span>
                                    <span>
                                        <div>{location.place}</div>
                                        <div>{location.city}</div>
                                    </span>
                                    <button 
                                        onClick={handleLocationSelectChange}
                                        className="ml-10 hover:cursor-pointer rounded-lg px-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-cyan-400 text-white"
                                    >Select</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
}