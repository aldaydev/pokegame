import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { PokeContext } from './context/PokeContext';
import AppHeader from './components/AppHeader/AppHeader';
import ShowPokemon from './pages/ShowPokemon/ShowPokemon';
import User from './pages/User/User';
import Home from './pages/Home';
import AppFooter from './components/AppFooter';
import star_icon from './assets/img/star_icon.svg';
import { AuthContext } from './context/AuthContext';


function App() {

  const { typeList } = useContext(PokeContext);
  const { winnerMsg, setWinnerMsg } = useContext(AuthContext);

  useEffect(()=>{
    const timeOut = ()=>{
      setTimeout(()=>{
        setWinnerMsg(false);
      },15000)
    }

    timeOut();
  },[winnerMsg, setWinnerMsg])

  return (
      <Router>
          <div className="App">
              <AppHeader/>
              <Routes>
                <Route path='/' element=<Home/> />

                {typeList.map((type, i)=>{
                  
                  return (
                    <Route key={i} path={type.dir} 
                    element=
                    <ShowPokemon 
                      name={`TIPO ${type.name}`} 
                      show='type'/>
                    />
                  )
                })}

              <Route path='/all' 
              element=
              <ShowPokemon 
                name='TODOS LOS POKEMON' 
                show='all'/> 
              />
              <Route path='/account' element=<User/> />
              
              </Routes>
              <AppFooter/>
              {winnerMsg && <div className='winnerMsg-position'>
                <div className='winnerMsg-container'>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img'/>
                  <h2 className='winnerMsg-title'>¡HAS CAZADO TODOS LOS POKEMON!</h2>
                </div>
                <div className='winnerMsg-bgContainer'>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                  <img src={star_icon} alt='Star icon' className='winnerMsg-img--litle'/>
                </div>
                
              </div>}
              
          </div>
      </Router>
          
  );

}

export default App;
