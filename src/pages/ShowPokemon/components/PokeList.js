
import { useContext, useEffect } from "react";
import { PokeContext } from "../../../context/PokeContext";
import { useLocation } from "react-router-dom";

const PokeList = ({show, name})=>{

    const { searchType, setTypeId, pokemons, setMainPokemon, showAllPoke, setShowAllPoke } = useContext(PokeContext);

    // const [currentPokeList, setCurrentPokeList] = useContext([]);

    const location = useLocation();

    useEffect(()=>{
      console.log(location.pathname)
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
        // switch(name){
        //   case 'NORMAL':
        //     setTypeId(1);
        //     break;
        //   case 'LUCHA':
        //     setTypeId(2);
        //     break;
        //   case 'VOLADOR':
        //     setTypeId(3);
        //     break;
        //   case 'VENENO':
        //     setTypeId(4);
        //     break;
        //   case 'TIERRA':
        //     setTypeId(5);
        //     break;
        //   case 'ROCA':
        //     setTypeId(6);
        //     break;
        //   case 'BICHO':
        //     setTypeId(7);
        //     break;
        //   case 'FANTASMA':
        //     setTypeId(8);
        //     break;
        //   case 'ACERO':
        //     setTypeId(9);
        //     break;
        //   case 'FUEGO':
        //     setTypeId(10);
        //     break;
        //   case 'AGUA':
        //     setTypeId(1);
        //     break;
        //   case 'PLANTA':
        //     setTypeId(12);
        //     break;
        //   case 'ELÉTRICO':
        //     setTypeId(13);
        //     break;
        //   case 'PSÍQUICO':
        //     setTypeId(14);
        //     break;
        //   case 'HIELO':
        //     setTypeId(15);
        //     break;
        //   case 'DRAGON':
        //     setTypeId(16);
        //     break;
        //   case 'HADA':
        //     setTypeId(17);
        //     break;
        //   default:
        // }
      }else if( show === 'all'){
        setShowAllPoke(showAllPoke === true ? false : true)
      }
      
    }, [])

    return(
        <aside className="showPoke-pokeList">

            {show === 'type' 
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
            }
        </aside>
    )
}

export default PokeList;