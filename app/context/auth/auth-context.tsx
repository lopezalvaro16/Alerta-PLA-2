import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthContextState} from '../../types';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const logInUser = (email: string, password: string) =>
  FIREBASE_AUTH.signInWithEmailAndPassword(email, password);

const singUpUser = (email: string, password: string) =>
  FIREBASE_AUTH.createUserWithEmailAndPassword(email, password);

const INITIAL_STATE: AuthContextState = {
  user: null,
  logInUser,
  singUpUser,
};

const AuthContext = createContext(INITIAL_STATE);

const FIREBASE_AUTH = auth();

export const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
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
    <AuthContext.Provider value={{user, logInUser, singUpUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
