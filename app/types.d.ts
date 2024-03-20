// types.ts

export type ImageType = {
  uri: string;
  type: string;
  name: string;
};

export interface RootStackParamList {
  Home: undefined;
  AlertConfirm: {
    date: string;
    alertType: string;
    alertImage: ImageType;
  };
}

export interface AuthContextState {
  user: FirebaseAuthTypes.User | null;
  logInUser: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>;
  singUpUser: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>;
}
