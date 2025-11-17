import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaSpotify, FaYoutube, FaApple } from "react-icons/fa";



export default function Navbar() {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-lg border-b border-red-500">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/" aria-label="Ir al inicio">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={30}
            className="cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Menú */}
      <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider">
        <a
          href="#top"
          className="text-red-500 hover:underline underline-offset-4 transition-all"
        >
          Inicio
        </a>

        <a
          href="#conciertos"
          className="hover:text-red-500 hover:underline underline-offset-4 transition-all"
        >
          Conciertos
        </a>

        <a
          href="#musica"
          className="hover:text-red-500 hover:underline underline-offset-4 transition-all"
        >
          Música
        </a>

        <a
          href="https://wa.me/51993469442"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Contacto
        </a>
      </div>

      {/* Redes Sociales con SVG optimizados */}
      {/* Redes Sociales */}
<div className="flex space-x-4 text-xl">
  <a
    href="https://www.instagram.com/losfalsospunk"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="hover:text-pink-500 transform hover:rotate-6 hover:scale-110 transition-transform duration-300"
  >
    <FaInstagram className="h-5 w-5" />
  </a>

  <a
    href="https://www.facebook.com/losfalsosband?locale=es_LA"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="hover:text-blue-500 transform hover:rotate-6 hover:scale-110 transition-transform duration-300"
  >
    <FaFacebookF className="h-5 w-5" />
  </a>

  <a
    href="https://open.spotify.com/intl-es/artist/6uLDG2e6EnGaLJW2D96jDY"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Spotify"
    className="hover:text-green-400 transform hover:rotate-6 hover:scale-110 transition-transform duration-300"
  >
    <FaSpotify className="h-5 w-5" />
  </a>

  <a
    href="https://www.youtube.com/@elbelzedistro2406"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="hover:text-red-600 transform hover:rotate-6 hover:scale-110 transition-transform duration-300"
  >
    <FaYoutube className="h-5 w-5" />
  </a>

  <a
    href="https://music.apple.com/us/artist/los-flechados/1469341637"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Apple Music"
    className="hover:text-white transform hover:rotate-6 hover:scale-110 transition-transform duration-300"
  >
    <FaApple className="h-5 w-5" />
  </a>
</div>

    </nav>
  );
}
