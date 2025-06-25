'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [logueado, setLogueado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogueado(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogueado(false);
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow">
      <nav className="flex justify-between items-center px-6 py-3">
        {/* nombre */}
        <Link href="/" className="text-xl font-bold text-white">
          CEIFLiX
        </Link>

        {/* Navegación */}
        <ul className="flex gap-4 items-center text-sm">
          <li>
            <Link href="/">Inicio</Link>
          </li>

          {logueado && (
            <>
              <li>
                <Link href="/mis-peliculas">Mis Películas</Link>
              </li>
              <li>
                <Link href="/perfil">Perfil</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-600">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}

          {!logueado && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Registro</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
