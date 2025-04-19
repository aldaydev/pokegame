import './AppHeader.css';
import './AppHeaderRes.css';
import { useContext, useEffect, useState } from "react";
import { PokeContext } from "../../context/PokeContext";
import { Link } from "react-router-dom";
import pokemon_logo from '../../assets/img/pokemon_logo.svg'
import pokeball2_icon from '../../assets/img/pokeball2_icon.svg'
import pokes_icon from '../../assets/img/pokes_icon.svg'
import menuToggle from '../../assets/img/menuToggle_icon.svg'
import user_icon from '../../assets/img/pokeuser_icon.svg'
import SearchForm from './SearchForm';
import { AuthContext } from '../../context/AuthContext';


const AppHeader = ()=>{

    const { setTypeId, typeList, showAllPoke, setShowAllPoke } = useContext(PokeContext);


    const { loggedIn, userPokeballs, userPokeCount, startGlobalHunt, showCountDown, showAchiement, setShowAchievement } = useContext(AuthContext);

    // Estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    const [dropList, setDropList] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleDropList = () => {
        setDropList(prevState => !prevState);
    };

    const handleAllButton = () => {
        setDropList(false);
        setIsOpen(false);
    };

    useEffect(()=>{
        setTimeout(()=>{
            setShowAchievement(null);
        },8000)
    },[showAchiement, loggedIn, setShowAchievement])

    // Estado para almacenar el ancho de la pantalla
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Función que se ejecuta cada vez que cambia el tamaño de la pantalla
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (windowWidth > 825) {
            setIsOpen(false);  // Cerrar el menú si el tamaño es mayor a 768px
            setDropList(false);  // Ocultar la lista desplegable si la pantalla es grande
        }
    };

    useEffect(() => {
        // Agregar el evento resize al montar el componente
        window.addEventListener('resize', handleResize);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    return(
        <header className={`App-header ${startGlobalHunt && 'App-header--block'}`}>
            <Link to='/'>
                <img src={pokemon_logo} alt="Logo de Pokemon" className="App-logo"/>
            </Link>

            <nav className="App-nav">
                <div className={isOpen ? 'nav-container' : ' nav-container nav-container--res'} >

                    <ul className={isOpen ? 'nav-pagesList' : 'nav-pagesList nav-pagesList--res'}>
                        <li className={dropList ? "nav-pagesItem--drop" : "nav-pagesItem"} onClick={handleDropList}>
                            
                            <div className={isOpen ? "pagesItem-dropTitle" : "pagesItem-dropTitle nav-pagesList--res"}>TIPOS</div>

                            <ul className="pagesItem-dropList">
                                {typeList.map((type, i)=>{
                                    return (
                                        <li key={i}
                                            onClick={()=>setTypeId(type.id)}
                                            className="pagesItem-dropItem"
                                        >
                                            <Link to={type.dir} onClick={toggleMenu}>
                                                {type.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>

                        <li onClick={()=>setShowAllPoke(showAllPoke === true ? false : true)} className="nav-pagesItem">
                            <Link to='/all' onClick={handleAllButton}>
                                TODOS
                            </Link>
                        </li>
                    </ul>
                
                    <SearchForm closeMenu={setIsOpen} closeDropList={setDropList}/>
                </div>
                

                <div className='nav-userButtons'>
                    {loggedIn && 
                    <>
                    
                    <Link to='/account'>
                        <img src={pokeball2_icon} className='nav-pokeball' alt='Pokeball icon'/>
                        <div className='pokeballCount-container'>
                            <span className='pokeballCount-number'>{userPokeballs}</span>
                        </div>
                    </Link>

                    <Link to='/account'>
                        <img src={pokes_icon} className='nav-pokemons' alt='Pokemon icon'/>
                        <div className='pokemonCount-container'>
                            <span className='pokemonCount-number'>{userPokeCount}</span>
                        </div>
                    </Link>

                    </>}
                    
                    <Link to='/account' onClick={handleAllButton}>
                        <img src={user_icon} className='nav-user' alt='User icon'/>
                    </Link>

                    <div className='nav-menuToggle' onClick={toggleMenu}>

                        <img src={menuToggle} alt='Icono de menú desplegable' className={!isOpen ? 'toggleIcon' : 'toggleIcon toggleIcon--mod'}/>
                        
                        
                    </div>

                </div>
                
            </nav>

            {loggedIn && showCountDown !== null && <div className="showCountDown-container">
                <span className="showCountDown-text">{`3 pokeballs más en:`}</span>
                <span className="showCountDown-count">{`${showCountDown} segundos`}</span>
            </div>}

            {loggedIn && showAchiement !== null && <div className="showAchievement-container">
                <span className="showCountDown-text">{`${showAchiement[0]}`}</span>
                <span className="showCountDown-count">{`${showAchiement[1]}`}</span>
            </div>}

        </header>
    )
}

export default AppHeader;