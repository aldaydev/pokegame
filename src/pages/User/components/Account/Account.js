import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

import './Account.css';
import './AccountRes.css';
import user_icon from '../../../../assets/img/pokeuser_icon.svg';
import pokeball2_icon from '../../../../assets/img/pokeball2_icon.svg';
import star_icon from '../../../../assets/img/star_icon.svg';
import lock_icon from '../../../../assets/img/lock_icon.svg';
import unlock_icon from '../../../../assets/img/unlock_icon.svg';

const Account = ()=>{
    
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [noSticky, setNoSticky] = useState(false);

    const { deleteAccount, removedMsg, userPokemons, userPokeballs, achList, signUpMsg, setSignUpMsg } = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState('');
    const [firstMsg, setFirstMsg] = useState(null);
    const [showBin, setShowBin] = useState(false);
    const [releaseImg, setReleaseImg] = useState(false);

    //Cerrar sesión
    const closeSession = ()=>{
        sessionStorage.removeItem('user');
        window.location.reload();
    }

    //Arrastrar un pokemon de la pokedex
    const dragItem = (e)=>{
        setShowBin(true);
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    //Colocar el pokemon sobre el candado
    const dragOver = (e)=>{
        e.preventDefault();
        setReleaseImg(true);
    }

    //Soltar el pokemon sobre el candado (librar)
    const dragArea = (e)=>{
        // e.preventDefault();
        console.log('DROPPED');
        const idToDelete = e.dataTransfer.getData("text/plain", e.target.id);
        console.log(idToDelete);
        const getSessionStorage = JSON.parse(sessionStorage.user);
        const getLocalPokeList = JSON.parse(sessionStorage.user).data.pokemons;

        getLocalPokeList.splice(idToDelete,1);
        getSessionStorage.data.pokemons = getLocalPokeList;
        getSessionStorage.data.pokeCount -= 1;
        console.log(getSessionStorage, getLocalPokeList);

        sessionStorage.user = JSON.stringify(getSessionStorage);

        window.location.reload();

    }

    //Mostrar el mensaje cuando creas la cuenta y cumplit primer logro
    useEffect(()=>{
        sessionStorage.user && JSON.parse(sessionStorage.user).data.achievements.length === 1 && signUpMsg && setFirstMsg(signUpMsg);

        const timeOut = ()=>{
            setTimeout(()=>{
                setFirstMsg(null);
                setSignUpMsg(null);
            },4000)
        }
        timeOut();
        sessionStorage.user && setUserEmail(JSON.parse(sessionStorage.user).email);
    },[])
    
    return(
        <main className="App-main App-main-account">
            <h1 className="App-main-title">TU ÁREA DE USUARIO</h1>
            <div className="account-container">
                <section className={`account-userSect ${noSticky && noSticky}`}>
                    <div className="userSect-imgContainer">
                        <img src={user_icon} alt="User icon" className="userSect-userImg"/>
                        <hgroup className="userSect-hgroup">
                            <h2 className="userSect-title">TU CUENTA</h2>
                            <p className="userSect-email">{userEmail}</p>
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
                    <h2 className="pokemonSect-title">TU POKEDEX</h2>
                    <article className="showPoke-pokeList--user">
                        {userPokemons && userPokemons.length > 0 ?
                        userPokemons.map((poke, i)=>{
                            return(
                                <div className="pokeList-item--user" key={i} onDragStart={(e)=>dragItem(e)} onDragEnd={(e)=>setShowBin(false)}id={i} draggable="true">
                                    <div className="pokeList-imgContainer">
                                        <img src={poke.img} alt={`Imagen de ${poke.name}`} className="pokeList-img" onDragStart={(e)=>dragItem(e)} id={i} draggable="true" />
                                    </div>
                                    <h3 className="pokeList-title">{poke.name}</h3>
                                </div>
                            )
                        })
                        :
                        <div className="pokelist-user--noPokeContainer">
                            <h3 className="pokelist-user--noPokeTitle">TUS POKEMON CAZADOS APARECERÁN AQUÍ</h3>
                        </div>
                        
                        }
                    </article>
                    
                </section>

                <aside className="account-aside">
                    <div className="accountAside-sticky">
                        <section className="acountAside-pokeballs">
                            <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg userSect-userImg--pokeball"/>
                            <h2 className="userPokeballs-title">TIENES {userPokeballs}{userPokeballs === 1 ? '  POKEBALL' : '  POKEBALLS'}</h2>
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
                                            sessionStorage.user && (JSON.parse(sessionStorage.user).data.achievements).includes(i) && 'ach-container--green'
                                        }`} key={i} >
                                            <h3 className="ach-left">{ach.achievement}</h3>
                                            <div className="ach-right">
                                                <span className="ach-num">{ach.reward}</span>

                                                {i !== 7 ?
                                                <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg"/>
                                                :
                                                <img src={star_icon} alt="Star Icon" className="userSect-userImg--star"/>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </article>
                            
                        </section>
                    </div>
                    
                </aside>
            </div>
            {firstMsg && 
                <div className="firstMsg-position">
                    <div className="firstMsg-container">
                        <h2 className="firstMsg-title">{firstMsg}</h2>
                        <div className="firstMsg-imgContainer">
                            <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg img--firstMsg"/>
                            <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg img--firstMsg"/>
                            <img src={pokeball2_icon} alt="Pokeball Icon" className="userSect-userImg img--firstMsg"/>
                        </div>
                    </div>
                </div>}
            {showBin && <div className="deletePokemon" onDrop={(e)=>dragArea(e)} onDragOver={(e)=> dragOver(e)} onDragLeave={(e)=>setReleaseImg(false)}>
                {!releaseImg ? <img src={lock_icon} alt="Icono papelera" className="deletePokemon-icon"/> : <img src={unlock_icon} alt="Icono papelera" className="deletePokemon-icon"/>}
                
            </div>}
            
        </main>
    )
}

export default Account;