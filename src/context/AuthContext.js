import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, setSignUpData, loadData, removeAllData, updateData } from '../utils/firebase'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);

  const [loginError, setLoginError] = useState([false, 'type', 'msg']);

  const [userPokeballs, setUserPokeballs] = useState(null);
  const [userPokemons, setUserPokemons] = useState(null);
  const [userPokeCount, setUserPokeCount] = useState(null);
  
  const [ showCountDown, setShowCountDown ] = useState(null)
  const [startGlobalHunt, setStartGlobalHunt] = useState(null);
  
  function setCountDown(){
    
    const countProcess = ()=>{
      let currentCount = 11;

      const eachSecond = setInterval(()=>{
            currentCount -= 1;
            console.log('CUENTA ATRÁS', currentCount)
            setShowCountDown(currentCount);
        },1000)

      setTimeout(()=>{
        console.log('Deja de contar');
        clearInterval(eachSecond);
        setUserPokeballs(3);
        setShowCountDown(null);
      },12000)
  
    }

    setTimeout(()=>{
      countProcess();
    },5600)

  }

  useEffect(()=>{
    if(loggedIn && userPokeballs === 0){
      // setIsCounting(true)
      setTimeout(()=>{
        setCountDown();
      },1000)
    }
  },[loggedIn, userPokeballs])


  
  useEffect(()=>{

    if(localStorage.user && userPokemons){
      const previousLS = JSON.parse(localStorage.user);
      const previousLSData = JSON.parse(localStorage.user).data;

      const newLSData = {...previousLSData, pokemons: userPokemons, pokeCount: userPokeCount}
      const newLS = {...previousLS, data: newLSData}

      localStorage.user = JSON.stringify(newLS);
      updateData(newLSData);
    }

  },[userPokemons])


  
  useEffect(()=>{

    if(loggedIn && userPokeballs === null && userPokeballs !== 0){
      setUserPokeballs(JSON.parse(localStorage.user).data.pokeballs);
      setUserPokeCount(JSON.parse(localStorage.user).data.pokeCount);
      setUserPokemons(JSON.parse(localStorage.user).data.pokemons);
    }

    localStorage.user && JSON.parse(localStorage.user).connected === true && setLoggedIn(true);
  }, [loggedIn, userPokeballs]) //He añadido las dependencias por sugrencia de REACT (VER)


  useEffect(()=>{
    if(localStorage.user && userPokeballs !== null){
      
      const previousLS = JSON.parse(localStorage.user);
      const previousLSData = JSON.parse(localStorage.user).data;

      const newLSData = {...previousLSData, pokeballs: userPokeballs}
      const newLS = {...previousLS, data: newLSData}

      localStorage.user = JSON.stringify(newLS);
      updateData(newLSData);

    }
    
  }, [userPokeballs])

  

  const signIn = async (email, password) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
        await loadData(email)
        setLoggedIn(true);
        
    } catch (error) {
      console.log(error.code)
        if (error.code === "auth/invalid-credential"){
            // alert('Contraseña incorrecta');
            setLoginError([true, 'signIn', 'Email o contraseña incorrectos'])
        }else{
            setLoginError([true, 'signIn', 'Ha habido un problema inesperado'])
        }
    }
  }; 

  const signUp = async (email, password) => {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        
        await setSignUpData(email);
        setLoggedIn(true);
        
    } catch (error) {
      console.log(error.code)
      setLoginError([true, 'signIn', 'Error inesperado'])
    }
  };

  const [removedMsg, setRemovedMsg] = useState(false);

  const deleteAccount = async ()=>{
    const email = JSON.parse(localStorage.user).email;
    console.log('EMAIL', email);
    const result = await removeAllData(email);
    setRemovedMsg(result);
    function reloadPage (){
      setTimeout(()=>{
        window.location.reload();
      },4000)
    }
    reloadPage();
  }

  return (
    <AuthContext.Provider value={ { loggedIn, signIn, loginError, signUp, deleteAccount, removedMsg, userPokeballs, setUserPokeballs, userPokemons, setUserPokemons, userPokeCount, setUserPokeCount, setCountDown, showCountDown, startGlobalHunt, setStartGlobalHunt } }>
      {children}
    </AuthContext.Provider>
  );
};
