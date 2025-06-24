export const Button = ({children, onClick, size="md"}) => {
    // definir clases segun tamaño
    const sizeClases = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    }

    return ( 
        <button className={`bg-white border rounded shadow ${sizeClases[size]}`} onClick={onClick}>{children}</button>
       
     );
}