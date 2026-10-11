
export const InputBox = ({ label,type = "text",name,id, placeholder, onChange,className,value, autoComplete, spellCheck}) => {
    const inputId = id || name
    return <div className="mb-4 min-w-0">
    <label htmlFor={inputId}>{label}</label>
    <input type={type} name={name} id={inputId} placeholder={placeholder} onChange={onChange} autoComplete={autoComplete} spellCheck={spellCheck} className={`mt-1 h-11 w-full rounded-xl border border-ink/10 bg-canvas px-4 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${className}`} value={value}  />
  </div>
}