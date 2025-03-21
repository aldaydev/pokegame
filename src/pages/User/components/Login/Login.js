import './Loggin.css';
import './LogginRes.css';
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import FormInput from "./FormInput";
import AppButton from '../../../../components/AppButton';
import { useState } from 'react';
import { validateEmail, validatePass } from '../../../../utils/validations';

const Login = ()=>{

    const { signIn, loginError, signUp } = useContext(AuthContext);

    const [emailError, setEmailError] = useState([false, 'type', 'msg']);
    const [passError, setPassError] = useState([false, 'type', 'msg']);

    //VALIDACIÓN DE SIGNIN
    const validateSignIn = (e, type)=>{
        e.preventDefault();

        const emailValue = e.target[0].value;
        const passValue = e.target[1].value;

        const emailFormat = validateEmail(emailValue);
        const passFormat = validatePass(passValue);
        
        emailFormat 
            ?  setEmailError([false, 'type', ''])
            : setEmailError([true, type, 'Formato de email no válido'])

        passFormat
            ?  setPassError([false, 'type', ''])
            : setPassError([true, type, 'La contraseña debe contener al menos una letra, un nº, un caracter especial y 6 dígitos'])
        
        if(emailFormat && passFormat){
            if(type === 'signIn'){
            signIn(emailValue, passValue);
            }else if(type === 'signUp'){
            signUp(emailValue, passValue);
            }
        }
    }

    return(
        <main className="App-main App-main--short App-main--login">
            <hgroup>
                <h1 className="App-main-title">ACCEDE</h1>
                <h2 className="App-main-sutitle">¡PODRÁS CAZAR POKEMONS Y GUARDARLOS EN TU POKEDEX!</h2>
            </hgroup>
            
            <section className="login-section">
                
                <article className="signIn-article">
                    <h3 className="login-subtitle">ACCEDE CON TU EMAIL</h3>
                    <form onSubmit={((e)=>{validateSignIn(e, 'signIn')})} className="signIn-form">
                        <div className='form-emailContainer'>
                            <FormInput type='text' placeholder='Email' className='loginInput'/>
                            {emailError[0] && emailError[1] === 'signIn' && <span className='form-errorMsg'>{emailError[2]}</span>}
                            {loginError[0] && loginError[1] === 'signIn' && <span className='form-errorMsg'>{loginError[2]}</span>}
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
                    <form onSubmit={((e)=>{validateSignIn(e, 'signUp')})} className="signIn-form">
                        <div className='form-emailContainer'>
                            <FormInput type='text' placeholder='Email' className='loginInput'/>
                            {emailError[0] && emailError[1] === 'signUp' && <span className='form-errorMsg'>{emailError[2]}</span>}
                        </div>
                        <div className='form-passContainer'>
                            <FormInput type='password' placeholder='Contraseña' className='loginInput'/>
                            {passError[0] && passError[1] === 'signUp' && <span className='form-errorMsg'>{passError[2]}</span>}
                            {loginError[0] && loginError[1] === 'signUp' && <span className='form-errorMsg'>{loginError[2]}</span>}
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