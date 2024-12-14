import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const initFireBase = async ()=>{
    try{
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
    }catch(error){
        alert(error)
    }
    
}   




