import { createContext } from "react";
import useTypeList from '../hooks/useTypeList'
import { useState, useEffect } from "react";

export const PokeContext = createContext();

export const PokeProvider = ({ children }) =>{

    const[searchType, setSearchType] = useState([]);
    const[typeId, setTypeId] = useState('1');
    // const[typeName, setTypeName] = useState('Normal');


    //OBTENER POKEMONS DE UN TIPO
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
                            name: (poke.name).toUpperCase(),
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

    const [pokemons, setPokemons] = useState([]);
    const [showAllPoke, setShowAllPoke] = useState(false);
    const [typeList, setTypeList] = useState([]);

    //OBTENER EL LISTADO DE TIPOS
    useEffect(()=>{
      const getTypes = async ()=> {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        const typesList = await response.json();
        const {results} = typesList;
        // console.log('typesList', results);
  
        const typesData = await Promise.all(results.map(async (type)=>{
            const response = await fetch(type.url);
            const eachType = await response.json();
            // console.log(eachType);
            if(eachType.name !== "unknown" && eachType.name !== "stellar" && 
                eachType.name !== "dark"){
                return {
                    id: eachType.id,
                    name: (eachType.names[5].name).toUpperCase(),
                    dir: eachType.name
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
    

    //OBTENER LOS 151 POKEMON
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
      
    }, [showAllPoke])

    const [mainPokemon, setMainPokemon] = useState('pikachu')
    const [showMainPoke, setShowMainPoke] = useState([])

    //OBTENER EL MAIN POKEMON
    useEffect(()=>{
      const getMainPokemon = async ()=>{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${mainPokemon}`);
        const pokeData = await response.json();

        const abilitiesList = await pokeData.abilities;
        const abilities = Promise.all(abilitiesList.reduce((acc, curr)=>{
          const getAbilities = async () =>{
            const response = await fetch(curr.ability.url);
            const abilityData = await response.json();
            // console.log(await abilityData.names[5].name);
            // console.log(await abilityData);
            return await abilityData.names[5].name
          }
          const ability = getAbilities();
          acc.push(ability);
          return acc;
        },[]))

        const statsList = await pokeData.stats;
        const stats = Promise.all(statsList.reduce((acc, curr)=>{
          
          let statName = curr.stat.name;

          switch(statName){
            case 'hp':
              statName = 'Resistencia';
              break;
            case 'attack':
              statName = 'Ataque';
              break;
            case 'defense':
              statName = 'Defensa';
              break;
            case 'special-attack':
              statName = 'Ataque especial';
              break;
            case 'special-defense':
              statName = 'Defensa especial';
              break;
            case 'speed':
              statName = 'Velocidad';
              break;
            default:
              statName = ''
          }

          const statObject = {
            name: statName,
            value: curr.base_stat
          }
          acc.push(statObject);
          return acc;
        },[]))
        
        const mainPokeObject = {
          name: (pokeData.name).toUpperCase(),
          weight: pokeData.weight,
          height: pokeData.height,
          experience: pokeData.base_experience,
          id: pokeData.id,
          img: pokeData.sprites.other.dream_world.front_default,
          abilities: await abilities,
          stats: await stats
        }

        setShowMainPoke(mainPokeObject);

        console.log(mainPokeObject);
        
      }

      getMainPokemon();
    },[mainPokemon])


    return(
        <PokeContext.Provider value={{ 
          setTypeId, //Cambia setID -> Cambia typeId -> Ejecuta setSearchType -> Cambia searchType (que nos da array con los pokemon de un tipo)
          typeId, //Devuelve el ID de un tipo
          searchType, //Devuelvo los pokemon de un tipo
          pokemons, //Devuelve los 151 pokemon
          typeList, //Devuelve el listado de tipos (viebe de setTypeList que se ejecuta al iniciar)
          // typeName, 
          // setTypeName, 
          showAllPoke, 
          setShowAllPoke, 
          setMainPokemon,
          showMainPoke
          } }>
            {children}
        </PokeContext.Provider>
    )
    
}