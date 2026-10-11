
export const Button = ({ label, onClick,text, type = "button", ...rest}) => {
    return <button type={type} onClick={onClick} className="mt-4 w-full rounded-full bg-canopy px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 ease-spring hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98] disabled:opacity-60" {...rest}>{text}
        {label}
    </button>
}