import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
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

const FirebaseContext = createContext(INITIAL_STATE);

export const FirebaseProvider = ({children}) => {
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
    <FirebaseContext.Provider
      value={{user, logInUser, singUpUser, FIRESTORE_DB, FIREBASE_AUTH}}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
