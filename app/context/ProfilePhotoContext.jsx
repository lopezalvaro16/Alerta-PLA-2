import React, {createContext, useContext, useEffect, useState} from 'react';
import {useFirebase} from './firebase-context';

const ProfilePhotoContext = createContext();

export const ProfilePhotoProvider = ({children}) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoURLDownload, setProfilePhotoURLDownload] = useState(null);
  const {FIREBASE_STORAGE, FIREBASE_AUTH} = useFirebase();

  useEffect(() => {
    const getProfilePhoto = async () => {
      try {
        const url = await FIREBASE_STORAGE.ref(
          `images/${FIREBASE_AUTH.currentUser.uid}-profile-photo.jpg`,
        ).getDownloadURL();
        setProfilePhotoURLDownload(url);
      } catch (error) {
        console.log('🚀 ~ getProfilePhoto ~ error:', error);
      }
    };
    getProfilePhoto();
  }, [profilePhoto, FIREBASE_STORAGE, FIREBASE_AUTH]);

  return (
    <ProfilePhotoContext.Provider
      value={{
        profilePhoto,
        setProfilePhoto,
        profilePhotoURLDownload,
      }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => useContext(ProfilePhotoContext);
