
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Register = () => {
    const [error, setError] = useState(null);

    const {register}= useContext(AuthContext)

  
    // const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        // leer form del navegador el form submit
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log("data", data);

        try {
            await register(data)

        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
            <h3>Estoy en Register </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user">Email</label>
                    <input type="email" id="user" name="email" required />
                </div>
                <div>
                    <label htmlFor="pass">Contraseña</label>
                    <input type="password" id="pass" name="password" required />
                </div>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <button type="submit">Enviar </button>
            </form>

            {error && <p className="text-red-400">{error}</p>}
        </>)
}
export default Register;