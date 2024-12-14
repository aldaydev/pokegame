import './Loggin.css';
import FormInput from "./FormInput";
import AppButton from '../../../../components/AppButton';
import { useState } from 'react';
import { validateEmail, validatePass } from '../../../../utils/validations';

const Login = ()=>{

    const [emailError, setEmailError] = useState([false, 'type', 'msg']);
    const [passError, setPassError] = useState([false, 'type', 'msg']);

    const validateSignIn = (e)=>{
        e.preventDefault();
        console.log()
        const emailValue = e.target[0].value;
        const passValue = e.target[1].value;
        
        validateEmail(emailValue) 
            ?  setEmailError([false, 'type', ''])
            : setEmailError([true, 'signIn', 'Formato de email no válido'])

        validatePass(passValue) 
            ?  setPassError([false, 'type', ''])
            : setPassError([true, 'signIn', 'La contraseña debe contener al menos una letra, un número, un caracter especial y 6 dígitos'])
    }

    const validateSignUp = (e)=>{
        e.preventDefault();

    }

    return(
        <main className="App-main App-main--short">
            <h1 className="App-main-title">ACCEDE</h1>
            <h2 className="App-main-sutitle">¡PODRÁS CAZAR POKEMONS Y GUARDARLOS EN TU POKEDEX!</h2>
            <section className="login-section">
                
                <article className="signIn-article">
                    <h3 className="login-subtitle">ACCEDE CON TU EMAIL</h3>
                    <form onSubmit={((e)=>{validateSignIn(e)})} className="signIn-form">
                        <div className='form-emailContainer'>
                            <FormInput type='text' placeholder='Email' className='loginInput'/>
                            {emailError[0] && emailError[1] === 'signIn' && <span className='form-errorMsg'>{emailError[2]}</span>}
                        </div>
                        <div className='form-passContainer'>
                            <FormInput type='password' placeholder='Contraseña' className='loginInput'/>
                            {passError[0] && passError[1] === 'signIn' && <span className='form-errorMsg'>{passError[2]}</span>}
                        </div>
                        
                        <AppButton text='ACCEDER' className='loginSubmit'/>
                    </form>
                    
                </article>

                <div className='login-separator'></div>

                <article className="signUp-article">
                <h3 className="login-subtitle">...O CREA TU CUENTA</h3>
                    <form onSubmit={((e)=>{validateSignUp(e)})} className="signIn-form">
                        <div className='form-emailContainer'>
                            <FormInput type='text' placeholder='Email' className='loginInput'/>
                            {emailError[0] && emailError[1] === 'signUp' && <span className='form-errorMsg'>{emailError[2]}</span>}
                        </div>
                        <div className='form-passContainer'>
                            <FormInput type='password' placeholder='Contraseña' className='loginInput'/>
                            {passError[0] && passError[1] === 'signUp' && <span className='form-errorMsg'>{passError[2]}</span>}
                        </div>
                        
                        <AppButton text='REGISTRARSE' className='loginSubmit'/>
                    </form>
                </article>
            </section>
            <footer className='login-footer'>
                <div className='login-warningContainer'>
                    <p className='warningContainer-text'>Los registros se realizan de forma segura a través de FireBase. Tanto tu correo como tu contraseña serán encriptados. Puedes eliminar tu perfil cuando quieras desde la página de usuario.</p>
                </div>
            </footer>
        </main>
    )
}

export default Login;