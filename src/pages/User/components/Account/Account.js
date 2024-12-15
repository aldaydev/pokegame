import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const Account = ()=>{
    
    const [deleteMsg, setDeleteMsg] = useState(false);
    const { deleteAccount, removedMsg } = useContext(AuthContext);

    const closeSession = ()=>{
        localStorage.removeItem('user');
        window.location.reload();
    }
    
    return(
        <main className="App-main App-main--short">
            <h1 className="App-main-title">SOY TU CUENTA</h1>
            <header>
                <ul>
                    <li>
                        {/* <img src={pokeuser_icon} alt='User icon'/> */}
                        <h3>TU CUENTA</h3>
                        <button onClick={()=>closeSession()}>CERRAR SESIÓN</button>
                        <button onClick={()=>setDeleteMsg(true)}>ELIMINAR CUENTA</button>
                        {
                            
                        deleteMsg && <div>
                                <div>
                                    <h3>
                                        {removedMsg ? removedMsg : '¿Estás seguro de que quieres borrar tu cuenta?'}
                                    </h3>
                                    {!removedMsg && <p>Perderás todos tus pokemons y pokeballs</p>}
                                    
                                    {
                                        !removedMsg && 
                                        <>
                                            <button onClick={()=>deleteAccount()}>Sí estoy seguro</button>
                                            <button onClick={()=>setDeleteMsg(false)}>Cancelar</button>
                                        </>
                                    }
                                    
                                </div>
                        </div>
                        }
                    </li>
                </ul>
            </header>
        </main>
    )
}

export default Account;