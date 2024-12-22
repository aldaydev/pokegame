import { useEffect, useState } from 'react';
import pokeball2_icon from '../assets/img/pokeball2_icon.svg';

const AppButton = ({text, type, className, img, imgClass, onClick, id})=>{

    // const [equalImg, setEqualImg] = useState(false);

    // useEffect(()=>{
    //     if(img === pokeball2_icon){
    //         setEqualImg(true);
    //     }else{
    //         setEqualImg(false);
    //     }
    // }, [img])

    const dragItem = (e)=>{
        if(img === pokeball2_icon){
            e.dataTransfer.setData("text/plain", e.target.id);
        }else{
            e.preventDefault();
        }
    }

    return (
        <button type={type} className={`AppButton ${className}`} onClick={onClick}>
            {img && <img src={img} className={`AppButton-img ${imgClass}`} alt={`Imagen de ${text}`} id={id} onDragStart={ (e)=>{dragItem(e)}}>
            </img>}
            <span>{text}</span>
            
        </button>
    )
}

export default AppButton;