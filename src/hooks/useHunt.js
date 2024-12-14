import { useEffect, useState } from "react"

const useHunt = ()=>{

    const [tryHunt, setTryHunt] = useState(null);
    const [huntResult, setHuntResult] = useState(null);

    useEffect(()=>{
        if(tryHunt !== null){
            const randomNumber = parseInt(Math.random()*100);
            console.log('RandomNumber', randomNumber);

            if(randomNumber <= tryHunt){
                setHuntResult(true);
                // alert('POKEMON CAZADO');
                setTryHunt(null);

            }else{
                setHuntResult(false);
                // alert('POKEMON ESCAPADO');
                setTryHunt(null);
            }
        }
    },[tryHunt])


    return [setTryHunt, huntResult];
}

export default useHunt;