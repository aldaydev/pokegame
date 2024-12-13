import search_icon from '../assets/img/search_icon.svg'
import { useContext, useState, useEffect } from "react";
import { PokeContext } from "../context/PokeContext";

const SearchForm = ()=>{

    const { setTypeId, typeList, showAllPoke, setShowAllPoke, setSearchPoke, searchError, setSearchError, searchPoke } = useContext(PokeContext);

    const [errorClass, setErrorClass] = useState('nav-form-error');
    const [switcher, setSwitcher] = useState(true);

    function searchPokemon(e){
        e.preventDefault();
        setErrorClass('nav-form-error');
        const searchValue = e.target[0].value;
        setSearchPoke(searchValue)
        const handleTimeout = ()=>{
            setTimeout(()=>{
                setErrorClass('nav-form-error-hidden');
            },2000)
        }
        handleTimeout();
    }



    return(
        <form onSubmit={(e)=>searchPokemon(e)} className="nav-form">
                    <input type='text' placeholder='Busca tu pokemon' className="nav-form-input"/>
                    <button type='submit' className="nav-form-submit">
                        <img src={search_icon} alt='Search icon'className="nav-form-submit-icon"/>
                    </button>
                    {/* <span className="nav-form-error">Ese pokemon no existe</span> */}
                    {searchError !== null ? <span className={errorClass}>{searchError}</span> : null}
                </form>
    )
}

export default SearchForm;