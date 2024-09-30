import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  // login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  // login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if token exists in localStorage
    return !!localStorage.getItem("authToken");
  });

  const [role, setRole] = useState<string | null>(null);

  // const login = (token: string, refreshToken: string) => {
  //   localStorage.setItem("authToken", token);
  //   localStorage.setItem("refreshToken", refreshToken);
  //   setIsAuthenticated(true);
  // };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setRole(null);
  };

  useEffect(() => {
    console.log("Se ejecuto el hook de useAuth");
    // Optionally, you can add logic to validate the token here
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setRole(decodedToken.rol);
      setIsAuthenticated(true);
      console.log(decodedToken.rol);
      // console.log("el rol es: " + role);
      console.log(role);
      console.log("autenticado? " + isAuthenticated);
    }
  }, [role]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
