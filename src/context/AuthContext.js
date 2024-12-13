import { createContext } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const firebaseConfig = {
        apiKey: "AIzaSyDwsdMznaTMlmsOtY3gvNhjNjN7zn2dj_A",
        authDomain: "pokestorealday.firebaseapp.com",
        projectId: "pokestorealday",
        storageBucket: "pokestorealday.firebasestorage.app",
        messagingSenderId: "224912064865",
        appId: "1:224912064865:web:08f528131e00f504d90520"
      };



  return (
    <PokeContext.Provider value={{}}>
      {children}
    </PokeContext.Provider>
  );
};
