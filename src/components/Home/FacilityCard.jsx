import './FacilityCard.css'


export const FacilityCard = ({ image, background, title, sub, onClick }) => {

    return <div onClick={onClick} className="facility-card-box flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-cyan-300 w-60 h-80">
        <div className="facility-card-image-container " style={{ backgroundColor: `${background}` }}>
            <img src={image} alt={title} />
        </div>
        <div className="facility-card-info text-center">
            <p>{title}</p>
            <p>{sub}</p>
        </div>
    </div>
}