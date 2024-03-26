import React, {createContext, useContext, useState} from 'react';

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState(null);

  const buildAlert = newAlert => {
    setAlert(newAlert);
  };

  return (
    <AlertContext.Provider value={{buildAlert, alert}}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
