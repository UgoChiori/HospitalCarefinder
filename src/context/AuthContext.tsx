import React, { useState, createContext } from "react";

interface AuthContextProps {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
