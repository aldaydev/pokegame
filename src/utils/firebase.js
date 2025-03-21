import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, deleteDoc, getDocs  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);

//SIGN UP
export async function fireBaseSignUp(email, password) {

    //Creating new account with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    //Creating new doc for new user
    const signUpData = {
        pokeballs: 3,
        pokemons: [],
        pokeCount: 0,
        achievements: [0],
        email: user.email
    }
    await setDoc(doc(db, 'users', user.uid), signUpData);

    //Setting up user data on sessionStorage
    const sessionStorageData = {
        connected: true,
        uid: user.uid,
        email: user.email,
        data: signUpData
    }
    sessionStorage.user = JSON.stringify(sessionStorageData);

    return 'HAS RECIBIDO 3 POKEBALLS POR REGISTRARTE';
}

//ACTUALIZR DATOS DEL USUARIO
export async function updateData(newData){
    if(sessionStorage.user){
        const uid = JSON.parse(sessionStorage.user).uid;
        await setDoc(doc(db, 'users', uid), newData);
    }
}

//SIGN IN
export async function fireBaseSignIn(email, password){
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    const sessionStorageData = {
        connected: true,
        email: email,
        uid: user.uid,
        data: {pokeballs: docSnap.data().pokeballs, pokeCount: docSnap.data().pokeCount, pokemons: docSnap.data().pokemons, achievements: docSnap.data().achievements}
    }

    sessionStorage.user = JSON.stringify(sessionStorageData);
}

//ELIMINAR DATOS DEL USUARIO (ELIMINAR CUENTA)
export async function removeAllData(uid) {
    const user = auth.currentUser;
    if (user) {
        try {
            await deleteDoc(doc(db, 'users', uid));
            await user.delete();
            sessionStorage.removeItem('user');
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




