
export const Button = ({ label, onClick,text, ...rest}) => {
    return <button onClick={onClick} className="w-full text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4" {...rest}>{text}
        {label}
    </button>
}