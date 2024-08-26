
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyATDcotVgXXKqTQnIdOucflCR8gImvwyRs",
  authDomain: "netflix-clone-38107.firebaseapp.com",
  projectId: "netflix-clone-38107",
  storageBucket: "netflix-clone-38107.appspot.com",
  messagingSenderId: "315852748271",
  appId: "1:315852748271:web:f7a5fcebc59f46d650b21a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user" ),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (error){
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async (email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email,password);  

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth); 
      
}

export  {auth,db,login,signup,logout};