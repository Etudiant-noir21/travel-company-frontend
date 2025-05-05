// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);
// pour la partie reservation : Baba Faye


// end for Baba .......

  const fetchProfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3700/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Échec récupération profil");

      const data = await response.json();
      setUtilisateur(data);
    } catch (error) {
      console.error("Erreur récupération profil :", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUtilisateur(null);
  };

  useEffect(() => {
    fetchProfil();
  }, []);

  // const url = "http://localhost:3700"
  const url = "https://travel-backend-gzpr.onrender.com"
  return (
    <AuthContext.Provider value={{ utilisateur, setUtilisateur, fetchProfil, logout,url }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
