'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const Perfil = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { user: userContext, logout } = useContext(AuthContext);

  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_API}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Usuario no autorizado");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
      setError("No se pudo cargar el perfil");
    }
  };

  return (
    <div className="p-6">
      <h1>Perfil del usuario</h1>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <p><b>Nombre:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Perfil;