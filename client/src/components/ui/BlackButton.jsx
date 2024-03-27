export const BlackButton = ({text, className}) => {
    return(
        <div className={`bg-black font-prompt px-5 py-[0.75rem] text-white max-w-fit rounded-xl ${className}`}>
            {text}
        </div>
    )
}