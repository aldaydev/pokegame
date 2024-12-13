import { useContext } from "react";
import { PokeContext } from "../../../context/PokeContext";
import loading_spinner from '../../../assets/img/loading_spinner.svg'

const MainPoke = (show, name)=>{

    const { showMainPoke } = useContext(PokeContext);

    // useEffect(()=>{
    //     showAllPoke === true ? false : true
    // },[])
    // useEffect(()=>{
    //     setMainPokemon(()=>(searchType[0].id))
    // }, [searchType])

    // useEffect(()=>{
    //     setMainPokemon(()=>(pokemons[0].id))
    // }, [pokemons])

    return(
        <article className="showPoke-mainPoke">

            {showMainPoke.stats === undefined ? 
                <div className="loadingSpinner-container">
                    <img src={loading_spinner} alt="Loading Spinner" className="loadingSpinner-gif"/>
                </div>
                    :
                <div className="mainPoke-container">
                    <h2 className="mainPoke-title">{showMainPoke.name}</h2>
                    
                    <section className="mainPoke-upperSec">

                        <div className="mainPoke-imgContainer">
                            <img src={showMainPoke.img} alt={`Imagen de ${showMainPoke.name}`} className="mainPoke-img"/>
                            <span className="mainPoke-id">{`#${showMainPoke.id}`}</span>
                        </div>

                        <div className="mainPoke-statsContainer">
                            <h2>Estadísticas</h2>
                            {showMainPoke.stats.map((stat, i)=>{
                                return (
                                    <div key={i}>
                                        <p className="mainPoke-statTitle">{`${stat.name}: ${stat.value}/255`}</p>
                                        <div key={i} className="mainPoke-statContainer">
                                            <div className="mainPoke-statProgres" style={{width: `${(stat.value / 255) * 100}%`} }></div>
                                        </div>
                                    </div>
                                    
                                )
                            })}
                    </div>



                </section>

                <section className="mainPoke-lowerSec">

                        <div className="mainPoke-types mainPoke-itemContainer">
                            <h3 className="mainPoke-itemTitle mainPoke-typeTitle">TIPO: </h3>
                            {showMainPoke.types.map((type, i)=>{
                                return (
                                    <p key={i} className="mainPoke-itemText">{`${type}`}</p>
                                )
                            })}
                        </div>

                        <div className="mainPoke-charsContainer mainPoke-itemContainer">
                            <h3 className="mainPoke-itemTitle">{`PESO: ${showMainPoke.weight}`}</h3>
                            <h3 className="mainPoke-itemTitle">{`ALTURA: ${showMainPoke.height}`}</h3>
                            <h3 className="mainPoke-itemTitle">{`EXP: ${showMainPoke.experience}`}</h3>
                        </div>

                        <div className="mainPoke-abilities mainPoke-itemContainer">
                            <h3 className="mainPoke-itemTitle">HABILIDADES: </h3>
                            {showMainPoke.abilities.map((ability, i)=>{
                                return (
                                    <p key={i} className="mainPoke-itemText">{`${ability.toUpperCase()}`}</p>
                                )
                            })}
                        </div>
                        
                        

                        
                </section>
                


            </div>
        }

        </article>
    )
}

export default MainPoke;