
export const Button = ({ label, onClick,text, ...rest}) => {
    return <button onClick={onClick} className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:underline hover:bg-blue-500 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4" {...rest}>{text}
        {label}
    </button>
}