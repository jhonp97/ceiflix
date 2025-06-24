import { useContext, useEffect, useState } from "react";

 
import { AuthContext } from "@/context/AuthContext";

const Perfil = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null)
 

    // renombro la variable en decontsruccion porque ya estoy usando user
    const {user:userContext, logout} = useContext(AuthContext)

    useEffect(() => {
        fetchUser()
    }, [])
    const BACKEND_API = import.meta.env.VITE_BACKEND_API

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${BACKEND_API}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!response.status) {
                throw new Error("Error al obtener datos del usuario")
            }
            const responseData = await response.json();
            console.log(responseData);
            setUser(responseData.data);

        } catch (e) {
            setError(e.message)
        }
    }



    return (
        <>
            <h3>Estoy en Perfil </h3>
            <h3>{userContext.email}</h3>
            {user ?
                <div>
                    <p>Bienvenido: {user.name} !</p>
                    <p>Email: {user.email} !</p>
                    <button onClick={logout}>Salir</button>
                </div> 
                :
                <p>Cargando usuario...</p>
            }

            {error && <p className="text-red-400">{error}</p>}

        </>
    )
}
export default Perfil;