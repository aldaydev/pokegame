import './Home.css';
import './HomeRes.css';

import welcome_img from '../assets/img/welcome_img.svg';
import number1 from '../assets/img/number1.svg';
import number2 from '../assets/img/number2.svg';
import number3 from '../assets/img/number3.svg';

const Home = ()=>{
    return(
        <main className="App-main App-main--short App-main--grid App-main--home">
            <h1 className="App-main-title App-main-title--home">¡BIENVENIDO!</h1>
            <section className="home-welcome">
                <article className="welcome-imageArticle">
                    <img src={welcome_img} alt='Bienvenida Pikachu' className='welcome-img'/>
                </article>
                <article className="welcome-textArticle">
                    <h4 className="welcome-text">Me llamo Rafa Alday <br/> y te doy la bienvenida al PokeGame.</h4>
                    {/* <h4 className="welcome-text">Aquí podrás ver y cazar pokemons, así como loguearte de manera segura y guardarlos en tu pokedex.</h4> */}
                    <h4 className="welcome-text">Este proyecto ha sido creado para mostrar mis conocimientos y habilidades.</h4>
                    <h4 className="welcome-text">La app ha sido desarrollada con React, Firebase Auth y FireStore, con datos de PokeAPI.</h4>
                </article>
            </section>
            <section className="home-howItWorks">

                <h2 className="App-main-title">¿CÓMO FUNCIONA?</h2>
                
                <ul className="howItWorks-list">
                    <li className="howItWorks-item">
                        <img src={number1} alt='Poke número 1' className="howItWorks-img"/>
                        <h3 className="howItWorks-text">BUSCA POKEMONS POR TIPO O NOMBRE</h3>
                    </li>
                    <li className="howItWorks-item">
                        <img src={number2} alt='Poke número 1' className="howItWorks-img"/>
                        <h3 className="howItWorks-text">HAZ LOGIN, CAZA POKEMONS Y LLENA TU POKEDEX</h3>
                    </li>
                    <li className="howItWorks-item">
                        <img src={number3} alt='Poke número 1' className="howItWorks-img"/>
                        <h3 className="howItWorks-text">RECIBE POKEBALLS AL CUMPLIR HITOS</h3>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className="App-main-title">VIDEO PRESENTACIÓN</h2>

                <div className='videoPresentation-container'>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VK3s8fbp3jI?si=HCGHEGUKMl-Y31e7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                
            </section>
        </main>
    )
}

export default Home;