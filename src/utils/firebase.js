import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, deleteDoc  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDwsdMznaTMlmsOtY3gvNhjNjN7zn2dj_A",
    authDomain: "pokestorealday.firebaseapp.com",
    projectId: "pokestorealday",
    storageBucket: "pokestorealday.firebasestorage.app",
    messagingSenderId: "224912064865",
    appId: "1:224912064865:web:08f528131e00f504d90520"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


const db = getFirestore(app);

export async function setSignUpData(email){
    const signUpData = {
        pokeballs: 5,
        pokemons: [],
        pokeCount: 0
    }
    await setDoc(doc(db, 'users', email), signUpData)

    const constlocalLogged = {
        connected: true,
        email: email,
        data: signUpData
    }
    localStorage.user = JSON.stringify(constlocalLogged);
}

export async function updateData(newData){
    if(localStorage.user){
        const email = JSON.parse(localStorage.user).email;
        await setDoc(doc(db, 'users', email), newData)
    }
}

export async function loadData(email){

    if(localStorage.user){
        email = JSON.parse(localStorage.user).email;
    }

    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);
    console.log('DOCSNAP', docSnap.data().pokeballs)

    const localLogged = {
        connected: true,
        email: email,
        data: {pokeballs: docSnap.data().pokeballs, pokeCount: docSnap.data().pokeCount, pokemons: docSnap.data().pokemons}
    }
    localStorage.user = JSON.stringify(localLogged);
} 

export async function removeAllData(email) {
    const user = auth.currentUser;
    if (user) {
        try {
            await user.delete();
            await deleteDoc(doc(db, 'users', email));
            localStorage.removeItem('user');
            console.log('Cuenta eliminada correctamente');
            return 'Cuenta eliminada correctamente';
        } catch (error) {
            console.log('Error al eliminar la cuenta. Reinicia la sesión y prueba de nuevo')
            return 'Error al eliminar la cuenta. Reinicia la sesión y prueba de nuevo'
        }
    } else {
        console.log('No hay un usuario autenticado.');
        return 'No hay un usuario autenticado.';
    }
    
    

}




