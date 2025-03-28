import { useContext, useEffect, useState } from "react";
import { PokeContext } from "../../../context/PokeContext";
import loading_spinner from '../../../assets/img/loading_spinner.svg'
import AppButton from "../../../components/AppButton";
import pokeball2_icon from '../../../assets/img/pokeball2_icon.svg'
import pokeuser_icon from '../../../assets/img/pokeuser_icon.svg'
import hunted_img from '../../../assets/img/hunted_img.svg'
import noHunted_img from '../../../assets/img/noHunted_img.svg'
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const MainPoke = (show, name)=>{

    const { showMainPoke, pokeProb, testPoke, setTestPoke } = useContext(PokeContext);
    const { loggedIn, setUserPokeballs, userPokeballs, setUserPokemons, userPokemons, setUserPokeCount, userPokeCount, setStartGlobalHunt } = useContext(AuthContext);

    const [ huntResult, setHuntResult ] = useState('initial');
    const [ startHunt, setStartHunt ] = useState(null);
    const [ huntMsg, setHuntMsg ] = useState(null);
    const [ resetHunt, setResetHunt ] = useState(true);
    const [ huntBtn, setHuntBtn ] = useState(null);

    const [changeBtn, setChangeBtn] = useState(0);

    //DETERMINA SI TIENES EL POKEMON Y DISPONE EL BOTÓN EN CONSECUENCIA
    useEffect(()=>{
        if(loggedIn){
            console.log('¿TIENES EL POKEMON?', testPoke);
            if(startHunt === null){
                if(testPoke){
                    setHuntBtn(<Link to='/account'>
                        <AppButton text='¡LO TIENES EN TU POKEDEX!' className='huntBtn huntBtn-green' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
                        </Link>)
                }else{
                    if(userPokeballs === 0){
                        setHuntBtn( 
                            <AppButton text='¡NO TE QUEDAN POKEBALLS!' className='huntBtn huntBtn-red' img={pokeball2_icon} imgClass='huntBtn-img'/>)
                    }else if(userPokeballs > 0){
                        setHuntBtn(<AppButton text='LANZAR POKEBALL' className='huntBtn' img={pokeball2_icon} imgClass='huntBtn-img'onClick={()=>{
                            setStartHunt(true);
                            setStartGlobalHunt(true);
                        }} id={showMainPoke.id}/>) 
                    }
                }
            }else{
                setHuntBtn(<AppButton text='POKEBALL LANZADA' className='huntBtn huntBtn-block' img={pokeball2_icon} imgClass='huntBtn-img'/>)
            }
            
        }else{
            setHuntBtn(<Link to='/account'>
                <AppButton text='REGÍSTRATE Y CÁZALO' className='huntBtn huntBtn-red' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
            </Link>)
        }
    },[loggedIn, testPoke,  userPokeballs, startHunt, showMainPoke]);

    //CALCULA SI EL POKEMON SERÁ CAZADO O NO
    useEffect(()=>{
            if(pokeProb && !testPoke && loggedIn){
                console.log('---- CALCULA SI SERÁ CAZADO ----');
                console.log('- POKEMON:',showMainPoke.name )
                console.log('- Prob de ser cazado: ', pokeProb);
                const randomNumber = parseInt(Math.random()*100);
                console.log('- Nº Aleatorio: ', randomNumber);

                if(randomNumber <= pokeProb){
                    console.log('Result: SERÁ CAZADO')
                    setHuntResult(true);

                }else if(randomNumber > pokeProb){
                    console.log('Result: NO SERÁ CAZADO')
                    setHuntResult(false);
                }
            }
            
    },[showMainPoke ,resetHunt])
    

    //PROCESO DE CAZADO
    useEffect(()=>{

        if(startHunt !== null && userPokeballs > 0){
            console.log('----- PROCESO DE CAZADO-----')

            console.log('1. Animación Pokeball - Primer timeOut');
            const timeOut = ()=>setTimeout(()=>{
                if(huntResult === true){

                    setUserPokeCount(userPokeCount + 1);
                    setTestPoke(true);

                    const newPokemonData = {
                        id: showMainPoke.id,
                        name: showMainPoke.name,
                        img: showMainPoke.img
                    }
                    console.log('Actualiza datos pokeballs');
                    const allHuntedPokemons = [...userPokemons, newPokemonData]
                    setUserPokemons(allHuntedPokemons);

                    console.log('Mensaje de ATRAPADO')
                    setHuntMsg(['¡POKEMON ATRAPADO!', 'Se ha añadido a tu Pokedex' ,'huntMsgWin', hunted_img, 'Image de pokemon cazado'])
                }else if(huntResult === false){
                    console.log('Mensaje de ESCAPADO')
                    setHuntMsg(['¡EL POKEMON HA ESCAPADO!', 'Pero seguro que pronto lo consigues','huntMsgLoose', noHunted_img, 'Imagen de pokemon no cazado']);
                }

                console.log('Resta una pokeball');
                setUserPokeballs(userPokeballs - 1); 
                
                const timeOut2 = ()=>{
                    
                    setTimeout(()=>{
                        
                        setHuntMsg(null);
                        setStartHunt(null);
                        setStartGlobalHunt(null);
                        setResetHunt(resetHunt === true ? false : true);
                        setChangeBtn(changeBtn + 1);
                    }, 4000)
                }

                console.log('2. Mensaje en pantalla y reset - segundo timeOut');
                timeOut2();
                
            },5000)
            
            timeOut();
        }
    },[startHunt])

    //SOLTAR LA POKEBALL SOBRE EL POKEMON
    const dragArea = (e)=>{
        console.log('SOLTADO');
        const idToHunt = e.dataTransfer.getData("text/plain", e.target.id);
        console.log(e.target.id);
        console.log(idToHunt);
        if(idToHunt === e.target.id){
            console.log('SON IGUALES');
            setStartHunt(true);
        }
    }


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

                        <div className="mainPoke-imgContainer" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>dragArea(e)}>
                            <img src={showMainPoke.img} alt={`Imagen de ${showMainPoke.name}`} className="mainPoke-img" id={showMainPoke.id}/>
                            <span className="mainPoke-id">{`#${showMainPoke.id}`}</span>
                            
                            {startHunt && 
                            <div className="hunt-pokeballContainer">
                                <img src={pokeball2_icon} alt="Pokeball icon" className="hunt-pokeball"/>
                            </div>}
                            
                            
                        </div>

                        {(startHunt && huntMsg) && 
                            <div className='huntMsgPosition'>
                                <div className={`huntMsgContainer ${huntMsg[2]}`}>
                                    <h2 className='huntMsg-title'>{huntMsg[0]}</h2>
                                    <p className='huntMsg-text'>{huntMsg[1]}</p>
                                    <img src={huntMsg[3]} alt={huntMsg[4]} className="huntMsg-img"/>
                                </div>
                            </div>
                        }

                        <div className="mainPoke-statsContainer">
                            <h2 className="mainPoke-statsTitle">Estadísticas</h2>
                            {showMainPoke.stats.map((stat, i)=>{
                                return (
                                    <div key={i}>
                                        
                                        <p className="mainPoke-statTitle">
                                            <span>{stat.name}</span>
                                            <span>{`: ${stat.value}/255`}</span>
                                        </p>
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
                                    <p key={i} className="mainPoke-itemText">{`(${type})`}</p>
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
                                    <p key={i} className="mainPoke-itemText">{`(${ability.toUpperCase()})`}</p>
                                )
                            })}
                        </div>
                </section>
                
                <section className="mainPoke-huntSection">
                    { huntBtn }
                </section>

            </div>
        }

        </article>
    )
}

export default MainPoke;