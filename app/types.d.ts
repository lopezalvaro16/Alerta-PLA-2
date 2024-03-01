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
