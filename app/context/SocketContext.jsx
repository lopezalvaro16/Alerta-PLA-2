import {API_URL} from '../constants/api-constans';
import React, {createContext, useContext, useEffect, useState} from 'react';
import SocketIOClient from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = SocketIOClient(API_URL);
    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setSocket(null);
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const emit = (event, ...args) => {
    console.log('🚀 ~ emit ~ socket:', socket);
    if (socket) {
      socket.emit(event, ...args);
    }
  };

  const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const connect = () => {
    if (!socket) {
      const newSocket = SocketIOClient(API_URL);
      setSocket(newSocket);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider value={{emit, on, connect, disconnect}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
