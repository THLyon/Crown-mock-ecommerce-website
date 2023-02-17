import { initializeApp } from 'firebase/app'; 
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

//* Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2gb6EJ4FBQnGi-vxYFFo0G8TuD2kt7vk",
    authDomain: "lyon-clothing-db.firebaseapp.com",
    projectId: "lyon-clothing-db",
    storageBucket: "lyon-clothing-db.appspot.com",
    messagingSenderId: "1092581724059",
    appId: "1:1092581724059:web:79cdc7b14154c1a58d1b3e"
  };

//* Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//* for google authentication providers; 
const provider = new GoogleAuthProvider(); 

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 