import search_icon from '../../assets/img/search_icon.svg'
import { useContext, useState } from "react";
import { PokeContext } from "../../context/PokeContext";
import { useNavigate } from 'react-router-dom';

const SearchForm = ({closeMenu, closeDropList})=>{

    const { setSearchPoke, searchError } = useContext(PokeContext);

    const [errorClass, setErrorClass] = useState('nav-form-error');

    const navigate = useNavigate()

    function searchPokemon(e){
        e.preventDefault();
        setErrorClass('nav-form-error');
        const searchValue = e.target[0].value;
        setSearchPoke(searchValue);
        navigate("/all");
        const handleTimeout = ()=>{
            setTimeout(()=>{
                setErrorClass('nav-form-error-hidden');
            },2000)
        }
        handleTimeout();

        closeMenu(false);
        closeDropList(false);
    }

    return(
        <form onSubmit={(e)=>searchPokemon(e)} className="nav-form">
            <input type='text' placeholder='Busca tu pokemon' className="nav-form-input"/>
            <button type='submit' className="nav-form-submit">
                <img src={search_icon} alt='Search icon'className="nav-form-submit-icon"/>
            </button>
                    
            {searchError !== null 
                ? <span className={errorClass}>{searchError}</span> 
                : null}
        </form>
    )
}

export default SearchForm;