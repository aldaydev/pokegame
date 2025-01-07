import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, deleteDoc, getDocs  } from 'firebase/firestore';

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

//SIGN UP
export async function setSignUpData(email){
    const signUpData = {
        pokeballs: 3,
        pokemons: [],
        pokeCount: 0,
        achievements: [0]
    }
    await setDoc(doc(db, 'users', email), signUpData)

    const constlocalLogged = {
        connected: true,
        email: email,
        data: signUpData
    }
    localStorage.user = JSON.stringify(constlocalLogged);
    return 'HAS RECIBIDO 3 POKEBALLS POR REGISTRARTE';
}

//ACTUALIZR DATOS DEL USUARIO
export async function updateData(newData){
    if(localStorage.user){
        const email = JSON.parse(localStorage.user).email;
        await setDoc(doc(db, 'users', email), newData)
    }
}

//SIGNIN (CARGAR DATOS DEL USUARIO)
export async function loadData(email){

    if(localStorage.user){
        email = JSON.parse(localStorage.user).email;
    }

    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);

    const localLogged = {
        connected: true,
        email: email,
        data: {pokeballs: docSnap.data().pokeballs, pokeCount: docSnap.data().pokeCount, pokemons: docSnap.data().pokemons, achievements: docSnap.data().achievements}
    }
    localStorage.user = JSON.stringify(localLogged);
} 

//ELIMINAR DATOS DEL USUARIO (ELIMINAR CUENTA)
export async function removeAllData(email) {
    const user = auth.currentUser;
    if (user) {
        try {
            await user.delete();
            await deleteDoc(doc(db, 'users', email));
            localStorage.removeItem('user');
            return 'Cuenta eliminada correctamente';
        } catch (error) {
            return 'Error al eliminar la cuenta. Reinicia la sesión y prueba de nuevo'
        }
    } else {
        return 'No hay un usuario autenticado.';
    }

}

//OBTENER EL LISTADO DE LOGROS
export async function getAchievements(){
    const querySnapshot = await getDocs(collection(db, "achievements"));

    return querySnapshot.docs.map((doc) => doc.data())
}




