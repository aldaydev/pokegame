import { useContext, useEffect, useState } from "react";
import { PokeContext } from "../../../context/PokeContext";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import MainPoke from "./MainPoke";

const PokeList = ({show, name})=>{

    const { searchType, setTypeId, pokemons, setMainPokemon, showAllPoke, setShowAllPoke } = useContext(PokeContext);

    const { userPokemons, loggedIn, startGlobalHunt } = useContext(AuthContext);

    const location = useLocation();

    const [listLinkStyle, setListLinkStyle] = useState('');

    const testPokeList = (testPoke)=>{
      // console.log(userPokemons);
      // console.log('USERPOKE', userPoke.name);
      return userPokemons.some((userPoke)=> userPoke.name.toLowerCase() === testPoke)
    }

    useEffect(()=>{
      if(show === 'type'){
        switch(location.pathname){
          case '/normal': setTypeId('normal');
          break;
          case '/fighting': setTypeId('fighting');
          break;
          case '/flying': setTypeId('flying');
          break;
          case '/poison': setTypeId('poison');
          break;
          case '/ground': setTypeId('ground');
          break;
          case '/rock': setTypeId('rock');
          break;
          case '/bug': setTypeId('bug');
          break;
          case '/ghost': setTypeId('ghost');
          break;
          case '/steel': setTypeId('steel');
          break;
          case '/fire': setTypeId('fire');
          break;
          case '/water': setTypeId('water');
          break;
          case '/grass': setTypeId('grass');
          break;
          case '/electric': setTypeId('electric');
          break;
          case '/psychic': setTypeId('psychic');
          break;
          case '/ice': setTypeId('ice');
          break;
          case '/dragon': setTypeId('dragon');
          break;
          case '/fairy': setTypeId('fairy');
          break;
          default: setTypeId('normal');
        }
      }else if( show === 'all'){
        setShowAllPoke(showAllPoke === true ? false : true)
      }
    }, [])

    return(
        <aside className="showPoke-pokeList">

            {show === 'type' 
                ? searchType.map((pokemon, i)=>{
                  
              return (
                <button key={i} onClick={()=> setMainPokemon(()=>(pokemon.name).toLowerCase())} className={`pokeList-item ${loggedIn && testPokeList(pokemon.name.toLowerCase()) && 'pokeList-item--owned'} ${startGlobalHunt && 'pokeList-item--block'}`}>
                  {/* autoFocus={MainPoke && pokemon.name === MainPoke.name && true} */}
                  <div className="pokeList-imgContainer">
                    <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`} className="pokeList-img"/>
                  </div>
                  
                  <h2 className="pokeList-title">{pokemon.name}</h2>
                </button>
              )
            }) : pokemons.map((pokemon, i)=>{
              return(
                <button key={i} onClick={()=> setMainPokemon(()=>(pokemon.name))} className={`pokeList-item ${loggedIn && testPokeList(pokemon.name) && 'pokeList-item--owned'} ${startGlobalHunt && 'pokeList-item--block'}`} >
                  {/* autoFocus={i === 0 && true} */}
                  <div className="pokeList-imgContainer">
                    <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`} className="pokeList-img"/>
                  </div>
                  <h2 className="pokeList-title">{pokemon.name}</h2>
                </button>
              )
            })
            }

            {/* {show === 'type' 
                ? searchType.map((pokemon, i)=>{
              return(
                <button key={i} onClick={()=> setMainPokemon(()=>(pokemon.name).toLowerCase())} className="pokeList-item">
                  <div className="pokeList-imgContainer">
                    <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`} className="pokeList-img"/>
                  </div>
                  
                  <h2 className="pokeList-title">{pokemon.name}</h2>
                </button>
              )
            }) : pokemons.map((pokemon, i)=>{
              return(
                <button key={i} onClick={()=> setMainPokemon(()=>(pokemon.name).toLowerCase())} className="pokeList-item">
                  <div className="pokeList-imgContainer">
                    <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`} className="pokeList-img"/>
                  </div>
                  <h2 className="pokeList-title">{pokemon.name}</h2>
                </button>
              )
            })
            } */}
        </aside>
    )
}

export default PokeList;