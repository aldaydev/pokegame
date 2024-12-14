const AppButton = ({text, type, className, img, imgClass, onClick})=>{
    return (
        <button type={type} className={`AppButton ${className}`} onClick={onClick}>
            {img && <img src={img} className={`AppButton-img ${imgClass}`} alt={`Imagen de ${text}`}>
            </img>}
            <span>{text}</span>
            
        </button>
    )
}

export default AppButton;