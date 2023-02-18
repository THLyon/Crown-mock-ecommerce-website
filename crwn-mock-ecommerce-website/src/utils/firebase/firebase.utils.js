import { initializeApp } from 'firebase/app'; 
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider(); 

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); 

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    //if we dont get a userAuth, exit function; Protection layer; 
    if(!userAuth) return; 

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef); 

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth; 
        const createdAt = new Date(); 

        try {
           await setDoc(userDocRef, {
            displayName, 
            email, 
            createdAt,
            ...additionalInformation
           }); 
        } catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => { 
    if(!email || !password) return; 

    createUserWithEmailAndPassword(auth, email, password)
}