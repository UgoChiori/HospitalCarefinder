// import React, { useState, createContext, Dispatch, SetStateAction } from "react";

// interface AuthContextProps {
//   currentUser: any;
//   setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const AuthContext = createContext<AuthContextProps>({
//   currentUser: null,
//   setCurrentUser: () => {},
//   isOpen: false,
//   setIsOpen: () => {},
// });

// const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [currentUser, setCurrentUser] = useState<any | null>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         setCurrentUser,
//         isOpen,
//         setIsOpen,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
import React, { useState, createContext, Dispatch, SetStateAction } from "react";

interface AuthContextProps {
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: () => {}, // Explicitly type as Dispatch<SetStateAction<any>>
  isOpen: false,
  setIsOpen: () => {}, // Explicitly type as Dispatch<SetStateAction<boolean>>
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
        setCurrentUser: setCurrentUser, // Explicitly provide the correct type
        isOpen,
        setIsOpen: setIsOpen, // Explicitly provide the correct type
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
