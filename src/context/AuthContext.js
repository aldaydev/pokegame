import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, setSignUpData, loadData, removeAllData, updateData, getAchievements } from '../utils/firebase'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);

  const [loginError, setLoginError] = useState([false, 'type', 'msg']);

  const [userPokeballs, setUserPokeballs] = useState(null);
  const [userPokemons, setUserPokemons] = useState(null);
  const [userPokeCount, setUserPokeCount] = useState(null);
  
  const [ showCountDown, setShowCountDown ] = useState(null);
  const [ showAchiement, setShowAchievement] = useState(null);

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


  
  //GENERA EL NUEVO HITO CUANDO SE CONSIGUE
  useEffect(()=>{
    if(loggedIn){
        const currentAch = JSON.parse(localStorage.user).data.achievements;
        if(currentAch)
        switch(userPokeCount){
          //SI SE CUMPLE EL HITO DE CAZAR 3 POKEMONS
          case 3:
            if(currentAch && !currentAch.includes(1)){
              alert('HITO CONSEGUIDO');
              setShowAchievement('¡Logro cumplido, has recibido 5 pokeballs');
              setUserPokeballs((previous)=>previous + 5);
            }
            break;
          case 5:
            if(currentAch && !currentAch.includes(2)){
              alert('HITO CONSEGUIDO');
              setShowAchievement('¡Logro cumplido, has recibido 8 pokeballs');
              setUserPokeballs((previous)=>previous + 8);
            }
            break;
          case 7:
            if(currentAch && !currentAch.includes(3)){
              alert('HITO CONSEGUIDO');
              setShowAchievement('¡Logro cumplido, has recibido 10 pokeballs');
              setUserPokeballs((previous)=>previous + 10);
            }
            break;
          default: 
        }
      }
  },[userPokeCount])


  // CONTADOR QUE RESETEA LAS POKEBALLS CUANDO LLEGAN A 0 Y NO SE HA CUMPLIDO NINGÚN HITO EN ESE INTENTO
  useEffect(()=>{
    if(loggedIn && userPokeballs === 0 && userPokeCount !== 3 && userPokeCount !== 5 && userPokeCount !== 7){
      // setIsCounting(true)
      setTimeout(()=>{
        setCountDown();
      },1000)
    }
  },[loggedIn, userPokeballs])


  //ACTUALIZA LOS POKEMONS Y LOGROS DEL USUARIO
  useEffect(()=>{

    if(localStorage.user && userPokemons){
      const previousLS = JSON.parse(localStorage.user);
      const previousLSData = JSON.parse(localStorage.user).data;

      let newLSData, newLS;
      const currentAch = JSON.parse(localStorage.user).data.achievements;
      switch (userPokeCount){
        case 3:
          if(currentAch && !currentAch.includes(1)){
            newLSData = {...previousLSData, pokemons: userPokemons, pokeCount: userPokeCount, achievements: [0,1], pokeballs: (userPokeballs + 5)}
            newLS = {...previousLS, data: newLSData}
            localStorage.user = JSON.stringify(newLS);
            updateData(newLSData);
          }
          break;
        case 5:
          if(currentAch && !currentAch.includes(2)){
            newLSData = {...previousLSData, pokemons: userPokemons, pokeCount: userPokeCount, achievements: [0,1,2], pokeballs: (userPokeballs + 8)}
            newLS = {...previousLS, data: newLSData}
            localStorage.user = JSON.stringify(newLS);
            updateData(newLSData);
          }
          break;
        case 7:
          if(currentAch && !currentAch.includes(3)){
            newLSData = {...previousLSData, pokemons: userPokemons, pokeCount: userPokeCount, achievements: [0,1,2,3], pokeballs: (userPokeballs + 10)}
            newLS = {...previousLS, data: newLSData}
            localStorage.user = JSON.stringify(newLS);
            updateData(newLSData);
          }
          break;
        default: 
          newLSData = {...previousLSData, pokemons: userPokemons, pokeCount: userPokeCount}
          newLS = {...previousLS, data: newLSData};
          localStorage.user = JSON.stringify(newLS);
          updateData(newLSData);
          break;
    
          
      }

    }

  },[userPokemons])


  //ACTUALIZA LOS POKEMONS DEL USUARIO
  // useEffect(()=>{

  //   if(localStorage.user && userPokemons){
  //     const previousLS = JSON.parse(localStorage.user);
  //     const previousLSData = JSON.parse(localStorage.user).data;

  //     const newLSData = {...previousLSData, pokemons: userPokemons, pokeCount: userPokeCount}
  //     const newLS = {...previousLS, data: newLSData}

  //     localStorage.user = JSON.stringify(newLS);
  //     updateData(newLSData);

  //   }

  // },[userPokemons])


  //ESTABLECE SI EL USUARIO ESTÁ CONECTADO Y RECUPERA SUS POKEBALLS Y POKEMONS
  useEffect(()=>{

    if(loggedIn && userPokeballs === null && userPokeballs !== 0){
      setUserPokeballs(JSON.parse(localStorage.user).data.pokeballs);
      setUserPokeCount(JSON.parse(localStorage.user).data.pokeCount);
      setUserPokemons(JSON.parse(localStorage.user).data.pokemons);
    }

    localStorage.user && JSON.parse(localStorage.user).connected === true && setLoggedIn(true);

  }, [loggedIn, userPokeballs]) //He añadido las dependencias por sugrencia de REACT (VER)


  //ACTUALIZA LAS POKEBALLS DEL USUARIO
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

  const [achList, setAchList] = useState(null)

  //OBTENER LA LISTA DE LOGROS
  useEffect(()=>{
    if(achList === null){
      const gettinAch = async()=>{
        const getAchList = await getAchievements();
        setAchList(getAchList);
      }
      gettinAch();

    }
  },[])
  
  //SIGN IN
  const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        await loadData(email)
        setLoggedIn(true);
        
    } catch (error) {
      console.log(error.code)
        if (error.code === "auth/invalid-credential"){
            setLoginError([true, 'signIn', 'Email o contraseña incorrectos'])
        }else{
            setLoginError([true, 'signIn', 'Ha habido un problema inesperado'])
        }
    }
  }; 

  //SIGN UP
  const signUp = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
        await setSignUpData(email);
        setLoggedIn(true);
        
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        setLoginError([true, 'signUp', 'La cuenta ya existe']);
      }else{
        setLoginError([true, 'signUp', 'Error inesperado'])
      }
      
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
    <AuthContext.Provider value={ { loggedIn, signIn, loginError, signUp, deleteAccount, removedMsg, userPokeballs, setUserPokeballs, userPokemons, setUserPokemons, userPokeCount, setUserPokeCount, setCountDown, showCountDown, startGlobalHunt, setStartGlobalHunt, achList, setShowAchievement, showAchiement } }>
      {children}
    </AuthContext.Provider>
  );
};
