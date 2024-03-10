export const BlackButton = ({text, className}) => {
    return(
        <div className={`bg-black px-5 py-3 text-white max-w-fit rounded-xl ${className}`}>
            {text}
        </div>
    )
}