'use client'
import Link from 'next/link';

const Footer = () => {
    return ( <>
    <footer className="bg-gray-800 text-white shadow">
        <section className="flex justify-between items-center px-6 py-3">
        <Link href="/" className="text-xl font-bold text-white">
          CEIFLiX
        </Link>

        </section>
    

    </footer>
    </> );
}
 
export default Footer;