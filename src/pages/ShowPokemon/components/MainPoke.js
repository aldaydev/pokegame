import { useContext, useEffect, useState } from "react";
import { PokeContext } from "../../../context/PokeContext";
import loading_spinner from '../../../assets/img/loading_spinner.svg'
import AppButton from "../../../components/AppButton";
import pokeball2_icon from '../../../assets/img/pokeball2_icon.svg'
import pokeuser_icon from '../../../assets/img/pokeuser_icon.svg'
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import useHunt from "../../../hooks/useHunt";

const MainPoke = (show, name)=>{

    const { showMainPoke, pokeProb } = useContext(PokeContext);
    const { loggedIn } = useContext(AuthContext);
    const [ setTryHunt, huntResult ] = useHunt();
    const [ startHunt, setStartHunt] = useState(null);
    const [ huntMsg, setHuntMsg] = useState(null);

    useEffect(()=>{
        if(startHunt !== null){
            const timeOut = ()=>setTimeout(()=>{
                console.log('Pasa una vez');
                huntResult 
                    ? setHuntMsg(['¡POKEMON ATRAPADO!', 'huntMsg huntMsgWin'])
                    : setHuntMsg(['¡EL POKEMON HA ESCAPADO!', 'huntMsg huntMsgLoose']);
                setStartHunt(false);
                const timeOut2 = ()=>{
                    setTimeout(()=>{
                        setHuntMsg(null);
                    }, 5000)
                }
                timeOut2();
            },5000)
            timeOut();
        }
    },[startHunt])


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
                            
                            {startHunt && 
                            <div className="hunt-pokeballContainer">
                                <img src={pokeball2_icon} alt="Pokeball icon" className="hunt-pokeball"/>
                            </div>}
                            
                            
                        </div>

                        {huntResult && huntMsg && 
                            <div className='huntMsgContainer'>
                                <h2 className={huntMsg[1]}>{huntMsg[0]}</h2>
                                <p></p>
                            </div>
                        }

                        <div className="mainPoke-statsContainer">
                            <h2 className="mainPoke-statsTitle">Estadísticas</h2>
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
                
                <section className="mainPoke-huntSection">
                    {
                        loggedIn 
                        ? 
                        <AppButton text='LANZAR POKEBALL' 
                        className='huntBtn' 
                        img={pokeball2_icon} 
                        imgClass='huntBtn-img'
                        onClick={()=>{
                            setTryHunt(pokeProb);
                            setStartHunt(true);
                        }}
                        />
                        :
                        <Link to='/account'>
                            <AppButton text='REGÍSTRATE Y CÁZALO' className='huntBtn' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
                        </Link>
                        
                    }
                    
                </section>

            </div>
        }

        </article>
    )
}

export default MainPoke;