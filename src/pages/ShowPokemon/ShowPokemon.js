import PokeList from "./components/PokeList";
import MainPoke from "./components/MainPoke";
import './ShowPokemon.css';

const ShowPokemon = ({name, show})=>{

    return (
        <main className="App-main App-main--showPoke">
            <h1 className="App-main-title  showPoke-title">{name.toUpperCase()}</h1>
            <section className="showPoke-section">
              <PokeList show={show} name={name}/>
              <MainPoke show={show} name={name}/>
            </section>
        </main>
    )
}

export default ShowPokemon;