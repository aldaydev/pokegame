import { useContext } from "react";
import { PokeContext } from '../../context/PokeContext';
import PokeList from "./components/PokeList";
import MainPoke from "./components/MainPoke";
import './ShowPokemon.css';

const ShowPokemon = ({name, show})=>{

    const { setTypeId, searchType, pokemons, typeList, typeId } = useContext(PokeContext);

    return (
        <main className="App-main App-main--showPoke">
            <h1 className="App-main-title  showPoke-title">{name.toUpperCase()}</h1>
            <section className="showPoke-section">
              <PokeList show={show} name={name}/>
              <MainPoke show={show} name={name}/>
            </section>
            
            {/* {show === 'type' 
                ? searchType.map((pokemon)=>{
              return(
                <div>
                  <h2>{pokemon.name}</h2>
                  <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`}/>
                </div>
              )
            }) : pokemons.map((pokemon)=>{
              return(
                <div>
                  <h2>{pokemon.name}</h2>
                  <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`}/>
                </div>
              )
            })
            } */}
        </main>
    )
}

export default ShowPokemon;