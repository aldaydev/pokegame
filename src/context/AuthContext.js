import { createContext, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initFireBase } from '../utils/firebase'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = async (email, password) => {
    try {
        
        const firebaseConfig = {
            apiKey: "AIzaSyDwsdMznaTMlmsOtY3gvNhjNjN7zn2dj_A",
            authDomain: "pokestorealday.firebaseapp.com",
            projectId: "pokestorealday",
            storageBucket: "pokestorealday.firebasestorage.app",
            messagingSenderId: "224912064865",
            appId: "1:224912064865:web:08f528131e00f504d90520"
        };
        console.log('Llega aquí');
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        console.log(email , password)
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log('Credenciales', credentials)
        
        setLoggedIn(true);
    } catch (error) {
        if (error.code === "auth/wrong-password" || error.code === "auth/invalid-email") {
            alert('Usuario o contraseña incorrectos');
        } else {
            alert('Error', error.message);
        }
    }

  }; 

  return (
    <AuthContext.Provider value={ { loggedIn, signIn } }>
      {children}
    </AuthContext.Provider>
  );
};
