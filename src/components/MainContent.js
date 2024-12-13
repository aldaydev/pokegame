import useTypeList from "../hooks/useTypeList";
import { useContext } from "react";
import { PokeContext } from "../context/PokeContext";

const MainContent = ({selectedType})=>{

    // const [setTypeId, searchType] = useTypeList();
    const { setTypeId, searchType, pokemons, typeList } = useContext(PokeContext);

    return(
        <main>
            {searchType.map((pokemon)=>{
              return(
                <div>
                  <h2>{pokemon.name}</h2>
                  <img src={pokemon.img} alt={`Imagen de ${pokemon.name}`}/>
                </div>
              )
            })}
        </main>
    )
}

export default MainContent;