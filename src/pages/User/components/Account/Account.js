import pokeuser_icon from '../../../../assets/img/pokeuser_icon.svg';

const Account = ()=>{
    return(
        <main className="App-main App-main--short">
            <h1 className="App-main-title">SOY TU CUENTA</h1>
            <header>
                <ul>
                    <li>
                        <img src={pokeuser_icon} alt='User icon'/>
                        <h3>TU CUENTA</h3>
                    </li>
                </ul>
            </header>
        </main>
    )
}

export default Account;