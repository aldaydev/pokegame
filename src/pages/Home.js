import pokemon_logo from '../assets/img/pokemon_logo.svg'

const Home = ()=>{
    return(
        <main className="App-main App-main--home">
            <h1>¡BIENVENIDO!</h1>
            <img src={pokemon_logo} style={{width : '150px'}}/>
        </main>
    )
}

export default Home;