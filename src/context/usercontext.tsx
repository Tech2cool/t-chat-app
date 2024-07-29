import React, {createContext, useContext, useState} from 'react';
interface contextType {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}
interface chidrenProps {
  children: React.ReactNode;
}

const UserContext = createContext<contextType>({} as contextType);
export const UserContextProvider: React.FC<chidrenProps> = ({children}) => {
  const [user, setUser] = useState<userType | null>(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext<contextType>(UserContext);
};
