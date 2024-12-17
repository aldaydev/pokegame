import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

import './Account.css';
import user_icon from '../../../../assets/img/pokeuser_icon.svg';
import pokeball2_icon from '../../../../assets/img/pokeball2_icon.svg';

const Account = ()=>{
    
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [noSticky, setNoSticky] = useState(false);
    const { deleteAccount, removedMsg, userPokemons, userPokeballs, achList } = useContext(AuthContext);

    const [userAch, setUserAch] = useState([])

    const closeSession = ()=>{
        localStorage.removeItem('user');
        window.location.reload();
    }

    useEffect(()=>{
        if(localStorage.user){
            setUserAch(JSON.parse(localStorage.user).data.achievements);
        }
    },[])
    
    return(
        <main className="App-main">
            <h1 className="App-main-title">TU ÁREA DE USUARIO</h1>
            <div className="account-container">
                <section className={`account-userSect ${noSticky && noSticky}`}>
                    <div className="userSect-imgContainer">
                        <img src={user_icon} alt="User icon" className="userSect-userImg"/>
                        <hgroup className="userSect-hgroup">
                            <h2 className="userSect-title">TU CUENTA</h2>
                            <p className="userSect-email">{JSON.parse(localStorage.user).email}</p>
                        </hgroup>
                    </div>

                    <div className="userSect-btnContainer" >
                        <button onClick={()=>closeSession()} className="AppButton AppButton-close">CERRAR SESIÓN</button>
                        <button onClick={()=>{
                            setDeleteMsg(true);
                            setNoSticky(()=>'account-userSect-noSticky');
                            }} className='AppButton AppButton-exit'>ELIMINAR CUENTA</button>
                        {
                        deleteMsg && 
                        <div className="deleteAccount-position">
                            <div className="deleteAccount-container">
                                <h3 className="deleteAccount-title">
                                    {removedMsg ? removedMsg : '¿Estás seguro de que quieres borrar tu cuenta?'}
                                </h3>
                                    {!removedMsg && <p className="deleteAccount-subtitle">Perderás todos tus pokemons, logros y pokeballs</p>}
                    
                                    { !removedMsg && 
                                    <div className="deleteAccount-btnContainer">
                                        <button onClick={()=>deleteAccount()} className="AppButton AppButton-exit">Sí estoy seguro</button>
                                        <button onClick={()=>setDeleteMsg(false)} className="AppButton AppButton-close">Cancelar</button>
                                    </div>
                                    }
                            </div>
                        </div>
                        }
                    </div>
                    
                    
                </section>

                <section className="account-pokemonSect">
                    <h2 className="pokemonSect-title">TUS POKEMON</h2>
                    <article className="showPoke-pokeList--user">
                        {userPokemons && userPokemons.map((poke, i)=>{
                            return(
                                <div className="pokeList-item pokeList-item--user" key={i}>
                                    <div className="pokeList-imgContainer">
                                        <img src={poke.img} alt={`Imagen de ${poke.name}`} className="pokeList-img"/>
                                    </div>
                                    <h3 >{poke.name}</h3>
                                </div>
                            )
                        })}
                    </article>
                    
                </section>

                <aside className="account-aside">
                    <section className="acountAside-pokeballs">
                        <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg userSect-userImg--pokeball"/>
                        <h2 className="userSect-title">TIENES {userPokeballs}{userPokeballs === 1 ? '  POKEBALL' : '  POKEBALLS'}</h2>
                    </section>

                    <section className="acountAside-achievements">
                        <h2 className="userSect-title userSect-title-ach"> TUS LOGROS</h2>
                        <article className="ach-article">
                            <div className="ach-container">
                                <h3 className="ach-title-left">LOGRO</h3>
                                <h3 className="ach-title-right">PREMIO</h3>
                            </div>
                            {achList && achList.map((ach, i)=>{
                                return(
                                    <div className={`ach-container ach-container--ach ${
                                        localStorage.user && (JSON.parse(localStorage.user).data.achievements).includes(i) && 'ach-container--green'
                                    }`} key={i} >
                                        <h3 className="ach-left">{ach.achievement}</h3>
                                        <div className="ach-right">
                                            <span className="ach-num">{ach.reward}</span>
                                            <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg"/>
                                        </div>
                                    </div>
                                )
                            })}
                        </article>
                        
                    </section>
                </aside>
            </div>
            
        </main>
    )
}

export default Account;