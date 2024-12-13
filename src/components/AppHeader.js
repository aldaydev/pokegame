import './AppHeader.css';
import { useContext, useState, useEffect } from "react";
import { PokeContext } from "../context/PokeContext";
import { Link } from "react-router-dom";
import pokemon_logo from '../assets/img/pokemon_logo.svg'
import pokeball_icon from '../assets/img/pokeball_icon.svg'
import user_icon from '../assets/img/user_icon.svg'
import login_icon from '../assets/img/login_icon.svg'
import SearchForm from './SearchForm';


const AppHeader = ()=>{

    const { setTypeId, typeList, showAllPoke, setShowAllPoke, setSearchPoke, searchError, setSearchError } = useContext(PokeContext);


    



    return(
        <header className="App-header">
            <Link to='/'>
                <img src={pokemon_logo} alt="Logo de Pokemon" className="App-logo"/>
            </Link>

            <nav className="App-nav">

                <ul className="nav-pagesList">
                    <li className="nav-pagesItem nav-pagesItem--drop">
                        <div className="pagesItem-dropTitle">TIPOS</div>
                        <ul className="pagesItem-dropList">
                            {typeList.map((type, i)=>{
                                // console.log(type.id)
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
                    <img src={pokeball_icon} alt='Pokeball icon' className='nav-pokeballs'/>
                    <img src={user_icon} alt='Poke User icon' className='nav-user'/>
                    <img src={login_icon} alt='Poke User icon' className='nav-login'/>
                </div>
                
            </nav>
        </header>
    )
}

export default AppHeader;