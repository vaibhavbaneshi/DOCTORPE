import './FacilityCard.css'


export const FacilityCard = ({ image, background, title, sub, onClick }) => {

    return <div onClick={onClick} className="facility-card-box hover:shadow-2xl hover:shadow-sky-300">
        <div className="facility-card-image-container " style={{ backgroundColor: `${background}` }}>
            <img src={image} alt={title} />
        </div>
        <div className="facility-card-info">
            <p>{title}</p>
            <p>{sub}</p>
        </div>
    </div>
}