import { useContext, useEffect, useState } from "react";
import { PokeContext } from "../../../context/PokeContext";
import loading_spinner from '../../../assets/img/loading_spinner.svg'
import AppButton from "../../../components/AppButton";
import pokeball2_icon from '../../../assets/img/pokeball2_icon.svg'
import pokeuser_icon from '../../../assets/img/pokeuser_icon.svg'
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const MainPoke = (show, name)=>{

    const { showMainPoke, pokeProb, testPoke, setTestPoke } = useContext(PokeContext);
    const { loggedIn, setUserPokeballs, userPokeballs, setUserPokemons, userPokemons, setUserPokeCount, userPokeCount, startGlobalHunt, setStartGlobalHunt } = useContext(AuthContext);

    const [ huntResult, setHuntResult ] = useState('initial');
    const [ startHunt, setStartHunt ] = useState(null);
    const [ huntMsg, setHuntMsg ] = useState(null);
    const [ resetHunt, setResetHunt ] = useState(true);
    const [ huntBtn, setHuntBtn ] = useState(null);

    const [changeBtn, setChangeBtn] = useState(0);

    useEffect(()=>{
        if(loggedIn){
            console.log('¿TIENES EL POKEMON?', testPoke);
            if(startHunt === null){
                if(testPoke){
                    // console.log('Tipo de botón: Ir a Pokedex');
                    setHuntBtn(<Link to='/account'>
                        <AppButton text='¡LO TIENES EN TU POKEDEX!' className='huntBtn huntBtn-green' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
                        </Link>)
                }else{
                    if(userPokeballs === 0){
                        // console.log('Tipo de botón: Sin pokeballs');
                        setHuntBtn( 
                            <AppButton text='¡NO TE QUEDAN POKEBALLS!' className='huntBtn huntBtn-red' img={pokeball2_icon} imgClass='huntBtn-img'/>)
                    }else if(userPokeballs > 0){
                        // console.log('Tipo de botón: Lanzar Pokeball');
                        setHuntBtn(<AppButton text='LANZAR POKEBALL' className='huntBtn' img={pokeball2_icon} imgClass='huntBtn-img'onClick={()=>{
                            setStartHunt(true);
                            setStartGlobalHunt(true);
                        }}/>) 
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
    },[loggedIn, testPoke,  userPokeballs, startHunt]) //He quitado "changeBtn"
    //testPoke, loggedIn, userPokeballs,

    // function setHuntBtn(){
    //     if(loggedIn){
    //         if(userPokeballs > 0){
    //             return <AppButton text='LANZAR POKEBALL' className='huntBtn' img={pokeball2_icon} imgClass='huntBtn-img'onClick={()=>{setStartHunt(true);}}/>
    //         }else if(userPokeballs === 0){
    //             return <Link to='/account'>
    //                 <AppButton text='¡LO TIENES EN TU POKEDEX!' className='huntBtn' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
    //             </Link>
    //         }else{
    //             <Link to='/account'>
    //                 <AppButton text='REGÍSTRATE Y CÁZALO' className='huntBtn' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
    //             </Link>
    //         }
    //     }
    // }

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
    

    useEffect(()=>{

        if(startHunt !== null && userPokeballs > 0){
            console.log('----- PROCESO DE CAZADO-----')

            console.log('Resta una pokeball');
            setUserPokeballs(userPokeballs - 1); 
            console.log('1. Animación Pokeball');
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
                    setHuntMsg(['¡POKEMON ATRAPADO!', 'Se ha añadido a tu Pokedex' ,'huntMsgWin'])
                }else if(huntResult === false){
                    console.log('Mensaje de ESCAPADO')
                    setHuntMsg(['¡EL POKEMON HA ESCAPADO!', 'Pero seguro que pronto lo consigues','huntMsgLoose']);
                }
                
                const timeOut2 = ()=>{
                    
                    setTimeout(()=>{
                        setHuntMsg(null);
                        setStartHunt(null);
                        setStartGlobalHunt(null);
                        setResetHunt(resetHunt === true ? false : true);
                        setChangeBtn(changeBtn + 1);
                    }, 3000)
                }

                // if(userPokeballs === 0){
                //     setCountDown();
                // }
                console.log('Entra segundo timeOut');
                timeOut2();
                // if(userPokeballs === 0){
                //     setCountDown();
                // }
                
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

                        {(startHunt && huntMsg) && 
                            <div className='huntMsgPosition'>
                                <div className={`huntMsgContainer ${huntMsg[2]}`}>
                                    <h2 className='huntMsg'>{huntMsg[0]}</h2>
                                    <p>{huntMsg[1]}</p>
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
                    {   huntBtn
                        // loggedIn 
                        // ? 
                        // <AppButton text='LANZAR POKEBALL' 
                        // className='huntBtn' 
                        // img={pokeball2_icon} 
                        // imgClass='huntBtn-img'
                        // onClick={()=>{
                        //     setStartHunt(true);
                        // }}
                        // />
                        // :
                        // <Link to='/account'>
                        //     <AppButton text='REGÍSTRATE Y CÁZALO' className='huntBtn' img={pokeuser_icon} imgClass='huntBtn-img-loggin'/>
                        // </Link>
                        
                    }
                    
                </section>

            </div>
        }

        </article>
    )
}

export default MainPoke;