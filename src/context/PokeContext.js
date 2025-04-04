import { createContext } from "react";
import { useState, useEffect } from "react";

export const PokeContext = createContext();

export const PokeProvider = ({ children }) => {

  const [searchType, setSearchType] = useState([]);
  const [typeId, setTypeId] = useState(null);

  const [mainPokemon, setMainPokemon] = useState(null);
  const [showMainPoke, setShowMainPoke] = useState([]);

  const [pokemons, setPokemons] = useState([]);
  const [showAllPoke, setShowAllPoke] = useState(null);
  const [typeList, setTypeList] = useState([]);

  const [pokeProb, setPokeProb] = useState(null);

  const [testPoke, setTestPoke] = useState(null);


  //COMPROBAR SI EL USUARIO TIENE EL MAIN POKEMON
  async function testingPoke(pokeName){
    
    if(sessionStorage.user && JSON.parse(sessionStorage.user).data.pokemons){
      const userPokes = JSON.parse(sessionStorage.user).data.pokemons;

      const testing = await userPokes.some((userPoke)=>{
      return userPoke.name.toLowerCase() === pokeName.toLowerCase()
    })
    setTestPoke(testing);
    }
  }

  //OBTENER POKEMONS DE UN TIPO
  useEffect(() => {
    
    if (typeId !== null) {
      const getTypeById = async () => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${typeId}`
        );
        const data = await response.json();
        const typePokeList = data.pokemon;

        const allPokeType = await Promise.all(
          typePokeList.map(async (pokemon, index) => {
            const response = await fetch(pokemon.pokemon.url);
            const poke = await response.json();
            if (poke.id < 152) {
              index === 0 && setMainPokemon(poke.id);

              return {
                id: poke.id,
                name: poke.name.toUpperCase(),
                img: poke.sprites.other.dream_world.front_default,
              };
            }
            return null;
          })
        );
        const filteredPokeType = allPokeType.filter((poke) => poke !== null);

        setSearchType(filteredPokeType);
      };
      getTypeById();
    }
  }, [typeId]);

  //OBTENER EL LISTADO DE TIPOS
  useEffect(() => {
    const getTypes = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      const typesList = await response.json();
      const { results } = typesList;

      const typesData = await Promise.all(
        results.map(async (type) => {
          const response = await fetch(type.url);
          const eachType = await response.json();
          
          if (
            eachType.name !== "unknown" &&
            eachType.name !== "stellar" &&
            eachType.name !== "dark"
          ) {
            return {
              id: eachType.id,
              name: eachType.names[5].name.toUpperCase(),
              dir: eachType.name,
            };
          } else {
            return null;
          }
        })
      );
      const filteredTypesData = typesData.filter((data) => data !== null);
      setTypeList(await Promise.all(filteredTypesData));
    };
    getTypes();
  }, []);

  //OBTENER LOS 151 POKEMON
  useEffect(() => {
    if(showAllPoke !== null){
      const getPokemones = async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );
        const pokemonesList = await response.json();
        const { results } = pokemonesList;
  
        const newPokemones = results.map(async (pokemon, index) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json();

          if (!searchPoke) {
            index === 0 && setMainPokemon(poke.id);
          }
          return {
            id: poke.id,
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default,
          };
        });
        setPokemons(await Promise.all(newPokemones));
      };
      getPokemones();
    }
    
  }, [showAllPoke]);

  //OBTENER EL MAIN POKEMON
  useEffect(() => {
    if(mainPokemon !== null){
      const getMainPokemon = async () => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${mainPokemon}`
        );
        const pokeData = await response.json();
  
        const abilitiesList = await pokeData.abilities;
        const abilities = Promise.all(
          abilitiesList.reduce((acc, curr) => {
            const getAbilities = async () => {
              const response = await fetch(curr.ability.url);
              const abilityData = await response.json();

              return await abilityData.names[5].name;
            };
            const ability = getAbilities();
            acc.push(ability);
            return acc;
          }, [])
        );
  
        const statsList = await pokeData.stats;
        const stats = Promise.all(
          statsList.reduce((acc, curr) => {
            let statName = curr.stat.name;
  
            switch (statName) {
              case "hp": statName = "Resistencia";
                break;
              case "attack": statName = "Ataque";
                break;
              case "defense": statName = "Defensa";
                break;
              case "special-attack": statName = "Ataque especial";
                break;
              case "special-defense": statName = "Defensa especial";
                break;
              case "speed": statName = "Velocidad";
                break;
              default: statName = "";
            }
  
            const statObject = {
              name: statName,
              value: curr.base_stat,
            };
            acc.push(statObject);
            return acc;
          }, [])
        );

        const typesList = await pokeData.types;
        const types = Promise.all(
          typesList.reduce((acc, curr) => {
            let typeName = curr.type.name;
  
            switch(typeName){
              case 'normal': typeName = 'NORMAL';
                break;
              case 'fighting': typeName = 'LUCHA';
                break;
              case 'flying': typeName = 'VOLADOR';
                break;
              case 'poison': typeName = 'VENENO';
                break;
              case 'ground': typeName = 'TIERRA';
                break;
              case 'rock': typeName = 'ROCA';
                break;
              case 'bug': typeName = 'BICHO';
                break;
              case 'ghost': typeName = 'FANTASMA';
                break;
              case 'steel': typeName = 'ACERO';
                break;
              case 'fire': typeName = 'FUEGO';
                break;
              case 'water': typeName = 'AGUA';
                break;
              case 'grass': typeName = 'PLANTA';
                break;
              case 'electric': typeName = 'ELÉTRICO';
                break;
              case 'psychic': typeName = 'PSÍQUICO';
                break;
              case 'ice': typeName = 'HIELO';
                break;
              case 'dragon': typeName = 'DRAGON';
                break;
              case 'fairy': typeName = 'HADA';
                break;
              default: typeName = '';
            }
            acc.push(typeName);
            return acc;
          }, [])
        );
  
        const mainPokeObject = {
          name: pokeData.name.toUpperCase(),
          weight: pokeData.weight,
          height: pokeData.height,
          experience: pokeData.base_experience,
          id: pokeData.id,
          img: pokeData.sprites.other.dream_world.front_default,
          abilities: await abilities,
          stats: await stats,
          types: await types
        };
  
        testingPoke(pokeData.name);

        setPokeProb(parseInt(100 - (pokeData.base_experience / 400) * 100));
        setShowMainPoke(mainPokeObject);
      };
  
      getMainPokemon();
    }
    
  }, [mainPokemon]);

  const [searchPoke, setSearchPoke] = useState(null);
  const [searchError, setSearchError] = useState(null);


  //BUSCAR POKEMON POR NOMBRE
  useEffect(()=>{
    if(searchPoke !== null){
      
      const setSearch = searchPoke.toLowerCase();

      const getPokemones = async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );
        const pokemonesList = await response.json();
        const { results } = pokemonesList;

        const testPokemon = await results.find(poke => poke.name === setSearch);

        if(testPokemon === undefined ){
          setSearchError('Pokemon no encontrado');
        }else{
          setMainPokemon(testPokemon.name);
          setSearchError(null);
          setSearchPoke(testPokemon.name);
        }
      }
      getPokemones();
    }
  }, [searchPoke])

  

  return (
    <PokeContext.Provider
      value={{
        setTypeId, //Cambia setID -> Cambia typeId -> Ejecuta setSearchType -> Cambia searchType (que nos da array con los pokemon de un tipo)
        typeId, //Devuelve el ID de un tipo
        searchType, //Devuelvo los pokemon de un tipo
        pokemons, //Devuelve los 151 pokemon
        typeList, //Devuelve el listado de tipos (viebe de setTypeList que se ejecuta al iniciar)
        showAllPoke,
        setShowAllPoke,
        setMainPokemon,
        showMainPoke,
        searchPoke,
        setSearchPoke,
        searchError,
        setSearchError,
        pokeProb,
        testPoke,
        setTestPoke
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};
