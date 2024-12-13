import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { PokeContext } from './context/PokeContext';
import AppHeader from './components/AppHeader';
import ShowPokemon from './pages/ShowPokemon/ShowPokemon';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppFooter from './components/AppFooter';


function App() {

  // const { pokemons, typeList } = useContext(GlobalContext);
  // const [setTypeId, searchType] = useTypeList();
  const { setTypeId, searchType, pokemons, typeList } = useContext(PokeContext);



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
              </Routes>
              <AppFooter/>
              {/* <MainContent/> */}
          </div>
      </Router>
          
  );

}

export default App;
