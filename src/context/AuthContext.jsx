// import { createContext, useState } from "react";
// // import { useNavigate } from "react-router";

// // lctor de variables, item que me va a permitirr leer mis values( se utiliza en mis componentes)
// export const AuthContext = createContext();

// // obtener datos del LS
// const getUser = () => {
//     const localStorageUser = localStorage.getItem('user');
//     return localStorageUser ? JSON.parse(localStorageUser) : null;
// }

// // proveedor, se usa en Main.jsx
// export const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState(getUser)

//     // const navigate = useNavigate();
//     const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

//     // si existe usuario vale true
//     const isLoggedIn = !!user; // !!->devulve verdadero o falso  doble negado devuelve booleano implicito

//     const login = async (data) => {

//         const response = await fetch(`${BACKEND_API}/auth/login`, { // opciones de nuestro fetch
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });

//         const responseData = await response.json()
//         if (!response.ok) throw new Error(responseData.msg)
//         localStorage.setItem('token', responseData.data.token)
//         delete responseData.data.token
//         localStorage.setItem('user', JSON.stringify(responseData.data))

//         setUser(responseData.data)
//         navigate("/perfil")
//     }

//     const register = async (data) => {
//         const response = await fetch(`${BACKEND_API}/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });

//         const responseData = await response.json();

//         if (!response.ok) throw new Error(responseData.msg);

//         // hacer un login auto
//         await login ({
//             email:data.email,
//             password:data.password
//         })


//     };


//     const logout = () => {
//         //alert("Sesión cerrada");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null)
//         navigate("/login");
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn }}>
//             {children}

//         </AuthContext.Provider>
//     )

// }