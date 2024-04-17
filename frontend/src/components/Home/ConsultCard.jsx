import './ConsultCard.css'
import { useNavigate ,Link} from 'react-router-dom'
export const ConsultCard = ({ image, title, link }) => {

      const navigate=useNavigate();
    return <div className="consult-card">
        <div className="consult-card-img-container ">
            <img src={image} alt={title} />
        </div>
        <div className="consult-card-title">{title}</div>
        <Link to={link}>
        <div className="consult-card-consultnow">CONSULT NOW</div>
        </Link>
    </div>
}