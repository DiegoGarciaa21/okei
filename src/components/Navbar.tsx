"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaSpotify,
  FaYoutube,
  FaApple,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [activeSection, setActiveSection] = useState("top");
  const manualClickRef = useRef(false);

  const handleManualSet = (id: string) => {
    manualClickRef.current = true;
    setActiveSection(id);

    // Se desactiva el bloqueo después de 1 segundo
    setTimeout(() => {
      manualClickRef.current = false;
    }, 1000);
  };

  // ⭐ IntersectionObserver estable (ignora cambios internos)
  useEffect(() => {
    if (!isHome) return;

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualClickRef.current) return; // no interferir

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (id: string) =>
    isHome && activeSection === id
      ? "text-red-500 active"
      : "hover:text-red-500";

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

      {/* Menu */}
      <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider">
        <Link
          href="/#top"
          className={`nav-underline ${isActive("top")}`}
          onClick={() => handleManualSet("top")}
        >
          Inicio
        </Link>

        <Link
          href="/#conciertos"
          className={`nav-underline ${isActive("conciertos")}`}
          onClick={() => handleManualSet("conciertos")}
        >
          Conciertos
        </Link>

        <Link
          href="/#musica"
          className={`nav-underline ${isActive("musica")}`}
          onClick={() => handleManualSet("musica")}
        >
          Música
        </Link>

        <Link
          href="/discografia"
          className={`nav-underline ${
            pathname === "/discografia"
              ? "text-red-500 active"
              : "hover:text-red-500"
          }`}
          onClick={() => handleManualSet("discografia")}
        >
          Discografía
        </Link>

        <a
          href="https://wa.me/51993469442"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-underline hover:text-red-500"
        >
          Contacto
        </a>
      </div>

      {/* Redes */}
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
