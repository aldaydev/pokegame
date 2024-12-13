import { useState, useEffect } from "react";

const useTypeList = ()=>{

    const[searchType, setSearchType] = useState([]);
    const[typeId, setTypeId] = useState('1');

    useEffect(()=>{
        const getTypeById = async ()=>{
            const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
            const data = await response.json();
            const typePokeList = data.pokemon;
            const allPokeType = await Promise.all(
                typePokeList.map(async (pokemon) => {
                    const response = await fetch(pokemon.pokemon.url);
                    const poke = await response.json();
                    if(poke.id < 152){
                        // console.log(poke.id);
                        return  {
                            id: poke.id,
                            name: poke.name,
                            img: poke.sprites.other.dream_world.front_default
                        }   
                    }
                    return null
                })
            )
            const filteredPokeType = allPokeType.filter((poke) => poke !== null);
            
            setSearchType(filteredPokeType);
        }
        getTypeById();
    },[typeId])

    return [setTypeId, searchType];

}

export default useTypeList;