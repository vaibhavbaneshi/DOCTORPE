
export const InputBox = ({ label,type,name,id, placeholder, onChange,className,value}) => {
    return <div className="md:col-span-5 mb-4">
    <label htmlFor={name}>{label}</label>
    <input type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${className}`} value={value}  />
  </div>
}