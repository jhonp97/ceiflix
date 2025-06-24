export const Card = ({title, children}) => {
    return ( 
        <article className="
            p-6 
            rounded-lg 
            bg-white 
            shadow-md 
            hover:shadow-xl
            transition-all 
            duration-300 
            ease-in-out 
            hover:-translate-y-1 
            border 
            border-gray-200
            hover:border-gray-300
        ">
            <h3 className="font-bold text-xl mb-4 text-gray-800">{title}</h3>
            <div className="text-gray-600">
                {children}
            </div>
        </article>
     );
}