import React, {createContext, useContext, useEffect, useState} from 'react';
import {useUser} from './usercontext';
import io, {Socket} from 'socket.io-client';
import {SERVER_BASE_URL} from '../utils/contstant';

interface OnlineUser {
  username: string;
  socketId: string;
}

interface ContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[] | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  setOnlineUsers: React.Dispatch<React.SetStateAction<OnlineUser[] | null>>;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const SocketContext = createContext<ContextType>({} as ContextType);

export const SocketContextProvider = ({children}: ChildrenProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[] | null>(null);
  const {user} = useUser();

  useEffect(() => {
    if (user) {
      const newSocket = io(SERVER_BASE_URL);
      setSocket(newSocket);

      newSocket.emit('user-connect', user);
      newSocket.on('get-users', (activeUsers: OnlineUser[]) => {
        // console.log('active users ', activeUsers);
        setOnlineUsers(activeUsers);
      });
      // console.log('user Socket UseEffect');

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{socket, setSocket, onlineUsers, setOnlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext<ContextType>(SocketContext);
};
