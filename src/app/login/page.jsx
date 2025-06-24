
import { useState,useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
    const [error, setError] = useState(null);

    const {login, isLoggedIn}= useContext(AuthContext)

    

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        // leer form del navegador el form submit
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log("data", data);

        try {
            // manda el formData a mi funcion de Login
              await login(data) ; 

        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
            <h3>Inicie Sesión</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user">Email</label>
                    <input type="email" id="user" name="email" required />
                </div>
                <div>
                    <label htmlFor="pass">Contraseña</label>
                    <input type="password" id="pass" name="password" required />
                </div>

                <button type="submit">Acceder </button>
            </form>

            {error && <p className="text-red-400">{error}</p>}
        </>)
}
export default Login;