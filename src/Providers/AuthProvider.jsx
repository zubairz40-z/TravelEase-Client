import React, { Children, createContext, useContext, useEffect, useState } from "react";
import {auth} from "../firebase.config"
import { GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, } from "firebase/auth";

const AuthContext = createContext(null);

export const useAuth =()=> useContext(AuthContext);


const AuthProvider =({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true);


const googleProvider =new GoogleAuthProvider();

const createUser =(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
}
  
 const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
    const googleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);

    }

    const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
 
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser || null)
        setLoading(false);

       }) 
        return ()=> unsubscribe();
    
  },[])

    const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logout,
    setUser,     
  };

  return(
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )

}

export default AuthProvider;