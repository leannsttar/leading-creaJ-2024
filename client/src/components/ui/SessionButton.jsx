export const SessionButton = ({text, color, className}) => {
    return(
        <div className={`${color === "white" ? "bg-[#F0F0F0] text-black" : "bg-black text-white"} px-4 py-2 text-center text-[.9rem] ${className}`}>
            {text}
        </div>
    )
}