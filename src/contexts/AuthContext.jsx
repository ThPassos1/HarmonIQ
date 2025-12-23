import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar token ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setSession(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // 🔥 NOVO: Login automático usando token (para registro)
  const loginWithToken = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setSession(token);
    setUser(userData);
  };

  // Login normal
  const signIn = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    if (res.error) return { error: res.error };

    loginWithToken(res.token, res.user);
    return { error: null };
  };

  // Logout
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setSession(null);
    setUser(null);
  };

  // Registro – agora retorna token e user
  const signUp = async (name, email, password) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password
    });

    if (res.error) return { error: res.error };

    // O backend retorna: { token, user }
    loginWithToken(res.token, res.user);

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        signUp,
        loginWithToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
