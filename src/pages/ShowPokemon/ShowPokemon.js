import PokeList from "./components/PokeList";
import MainPoke from "./components/MainPoke";
import './ShowPokemon.css';
import './ShowPokemonRes.css';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const ShowPokemon = ({name, show})=>{

    const { loggedIn, showCountDown } = useContext(AuthContext);


    return (
        <main className="App-main App-main--showPoke">
            <h1 className="App-main-title  showPoke-title">{name.toUpperCase()}</h1>
            <section className="showPoke-section">
                <PokeList show={show} name={name}/>
                <MainPoke show={show} name={name}/>
            </section>

            {/* {loggedIn && showCountDown !== null && <div className="showCountDown-container">
                <span className="showCountDown-text">{`3 pokeballs más en:`}</span>
                <span className="showCountDown-count">{`${showCountDown} segundos`}</span>
            </div>} */}
            
            
        </main>
    )
}

export default ShowPokemon;