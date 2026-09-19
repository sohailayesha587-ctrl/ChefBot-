import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(undefined);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log('SocketProvider: Connecting to socket server...');

    const newSocket = io('/api', {
      transports: ['websocket'],
      withCredentials: true
    });

    newSocket.on('connect', () => {
      console.log('Socket connected successfully!', newSocket.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => {
      console.log('SocketProvider: Disconnecting socket...');
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (socket === undefined) {
    console.warn('No SocketProvider found');
    return null;
  }

  return socket;
};

export { SocketContext };