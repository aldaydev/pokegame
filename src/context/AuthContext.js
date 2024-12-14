import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(true);


  return (
    <AuthContext.Provider value={ { loggedIn } }>
      {children}
    </AuthContext.Provider>
  );
};
