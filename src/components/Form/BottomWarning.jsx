import { Link } from "react-router-dom"

export const BottomWarning = ({label, to, text}) => {
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>

        <div className=" pl-2 underline">
            <Link to={to}>{text}</Link>
        </div>
    </div>
}