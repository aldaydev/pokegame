import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { PokeContext } from './context/PokeContext';
import AppHeader from './components/AppHeader/AppHeader';
import ShowPokemon from './pages/ShowPokemon/ShowPokemon';
import User from './pages/User/User';
import Home from './pages/Home';
import AppFooter from './components/AppFooter';


function App() {

  const { typeList } = useContext(PokeContext);


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
          </div>
      </Router>
          
  );

}

export default App;
