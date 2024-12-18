import './AppHeader.css';
import { useContext, useEffect } from "react";
import { PokeContext } from "../../context/PokeContext";
import { Link } from "react-router-dom";
import pokemon_logo from '../../assets/img/pokemon_logo.svg'
import pokeball2_icon from '../../assets/img/pokeball2_icon.svg'
import pokes_icon from '../../assets/img/pokes_icon.svg'
import user_icon from '../../assets/img/pokeuser_icon.svg'
import SearchForm from './SearchForm';
import { AuthContext } from '../../context/AuthContext';


const AppHeader = ()=>{

    const { setTypeId, typeList, showAllPoke, setShowAllPoke } = useContext(PokeContext);


    const { loggedIn, userPokeballs, userPokeCount, startGlobalHunt, showCountDown, showAchiement, setShowAchievement } = useContext(AuthContext);


    // useEffect(()=>{

    //     setTimeout(()=>{
    //         setShowAchievement(null);
    //     },12000)

    // },[showAchiement, loggedIn])

    return(
        <header className={`App-header ${startGlobalHunt && 'App-header--block'}`}>
            <Link to='/'>
                <img src={pokemon_logo} alt="Logo de Pokemon" className="App-logo"/>
            </Link>

            <nav className="App-nav">

                <ul className="nav-pagesList">
                    <li className="nav-pagesItem nav-pagesItem--drop">
                        <div className="pagesItem-dropTitle">TIPOS</div>
                        <ul className="pagesItem-dropList">
                            {typeList.map((type, i)=>{
                                return (
                                    <li key={i}
                                        onClick={()=>setTypeId(type.id)}
                                        className="pagesItem-dropItem"
                                    >
                                        <Link to={type.dir}>
                                            {type.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>

                    <li onClick={()=>setShowAllPoke(showAllPoke === true ? false : true)} className="nav-pagesItem">
                        <Link to='/all'>
                            TODOS
                        </Link>
                    </li>
                </ul>
                
                <SearchForm/>

                <div className='nav-userButtons'>
                    {loggedIn && 
                    <>
                    
                    <Link>
                        <img src={pokeball2_icon} className='nav-pokeball' alt='Pokeball icon'/>
                        <div className='pokeballCount-container'>
                            <span className='pokeballCount-number'>{userPokeballs}</span>
                        </div>
                    </Link>

                    <Link>
                        <img src={pokes_icon} className='nav-pokemons' alt='Pokemon icon'/>
                        <div className='pokemonCount-container'>
                            <span className='pokemonCount-number'>{userPokeCount}</span>
                        </div>
                    </Link>

                    </>}
                    
                    <Link to='/account'>
                        <img src={user_icon} className='nav-user' alt='User icon'/>
                    </Link>
                    

                </div>
                
            </nav>

            {loggedIn && showCountDown !== null && <div className="showCountDown-container">
                <span className="showCountDown-text">{`3 pokeballs más en:`}</span>
                <span className="showCountDown-count">{`${showCountDown} segundos`}</span>
            </div>}

            {/* {loggedIn && showAchiement !== null && <div className="showCountDown-container showCountDown-container--ach">
                <span className="showCountDown-text">{`${showAchiement[0]}`}</span>
                <span className="showCountDown-count">{`${showAchiement[1]}`}</span>
            </div>} */}

        </header>
    )
}

export default AppHeader;