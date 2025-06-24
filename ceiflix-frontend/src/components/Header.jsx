import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
    return ( 

        <header className=" bg-gray-500 text-white"> 
            <nav className="flex justify-between p-2">
                <Link href="/"/>
                <Image
                    src="/next.svg"
                    alt="logo"
                    width={90}
                    height={19}
                />
                <ul className="flex gap-2">
                   
                    <li><Link href="/Login">Login</Link></li>
                    <li><Link href="/Register">Registrarse</Link></li>
                 
                </ul>
            </nav>
        </header>
     );
}