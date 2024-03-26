import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FIRESTORE_DB = firestore();
const FIREBASE_AUTH = auth();

const logInUser = (email, password) =>
  FIREBASE_AUTH.signInWithEmailAndPassword(email, password);

const singUpUser = (email, password) =>
  FIREBASE_AUTH.createUserWithEmailAndPassword(email, password);

const INITIAL_STATE = {
  user: null,
  FIREBASE_AUTH: null,
  FIRESTORE_DB: null,
  logInUser,
  singUpUser,
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(authUser => {
      console.log('🚀 ~ unsubscribe ~ authUser:', authUser);
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{user, logInUser, singUpUser, FIRESTORE_DB, FIREBASE_AUTH}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
