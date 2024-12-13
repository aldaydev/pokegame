import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) =>{

    const [pokemons, setPokemons] = useState([]);
    const [typeList, setTypeList] = useState([]);

    useEffect(()=>{

      const getPokemones = async ()=> {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
        const pokemonesList = await response.json();
        const {results} = pokemonesList;
        // console.log(pokemonesList);
  
        const newPokemones = results.map(async (pokemon)=>{
          const response = await fetch(pokemon.url);
          const poke = await response.json();
        //   console.log(poke);
  
          return {
            id: poke.id,
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default
          }
        })
        setPokemons(await Promise.all(newPokemones));
      }
      getPokemones();

      const getTypes = async ()=> {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        const typesList = await response.json();
        const {results} = typesList;
        // console.log('typesList', results);
  
        const typesData = await Promise.all(results.map(async (type)=>{
            const response = await fetch(type.url);
            const eachType = await response.json();
            console.log(eachType);
            if(eachType.name !== "unknown" && eachType.name !== "stellar" && 
                eachType.name !== "dark"){
                return {
                    id: eachType.id,
                    name: eachType.names[5].name
                  }
            }else{
                return null
            }
            
          })
        )
        const filteredTypesData = typesData.filter((data) => data !== null);
        setTypeList(await Promise.all(filteredTypesData));
      }
      getTypes();
      
    }, [])

    return(
        <GlobalContext.Provider value={{ pokemons, typeList } }>
            {children}
        </GlobalContext.Provider>
    )
    
}