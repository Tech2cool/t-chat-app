import React, {createContext, useContext, useState} from 'react';

interface contextType {
  messages: messageType[];
  setMessages: React.Dispatch<React.SetStateAction<messageType[]>>;
}
interface chidrenProps {
  children: React.ReactNode;
}

const MessagesContext = createContext<contextType>({} as contextType);

export const MessagesContextProvider = ({children}: chidrenProps) => {
  const [messages, setMessages] = useState<messageType[]>([]);

  return (
    <MessagesContext.Provider value={{messages, setMessages}}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
