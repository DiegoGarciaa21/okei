"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaSpotify,
  FaYoutube,
  FaApple,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [activeSection, setActiveSection] = useState("top");
  const manualClickRef = useRef(false);

  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll sin hash
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = -100;
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Navegación desde discografía -> home -> scroll
  const handleNavClick = async (e: any, id: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (!isHome) {
      router.push("/");

      setTimeout(() => {
        scrollTo(id);
      }, 350);

      return;
    }

    scrollTo(id);
  };

  const handleManualSet = (id: string) => {
    manualClickRef.current = true;
    setActiveSection(id);

    setTimeout(() => {
      manualClickRef.current = false;
    }, 800);
  };

  useEffect(() => {
    if (!isHome) return;

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualClickRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (id: string) =>
    isHome && activeSection === id
      ? "text-red-500 active"
      : "hover:text-red-500";

  return (
    <nav className="bg-black text-white py-4 px-6 sticky top-0 z-50 shadow-lg border-b border-red-500">
      <div className="flex justify-between items-center">

        {/* Logo */}
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

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wider">

          <Link
            href="/"
            className={`nav-underline ${isActive("top")}`}
            onClick={(e) => {
              handleManualSet("top");
              handleNavClick(e, "top");
            }}
          >
            Inicio
          </Link>

          <Link
            href="/"
            className={`nav-underline ${isActive("conciertos")}`}
            onClick={(e) => {
              handleManualSet("conciertos");
              handleNavClick(e, "conciertos");
            }}
          >
            Conciertos
          </Link>

          <Link
            href="/"
            className={`nav-underline ${isActive("musica")}`}
            onClick={(e) => {
              handleManualSet("musica");
              handleNavClick(e, "musica");
            }}
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
            className="nav-underline hover:text-red-500"
          >
            Contacto
          </a>
        </div>

        {/* Redes desktop */}
        <div className="hidden md:flex space-x-4 text-xl">
          <a href="https://www.instagram.com/losfalsospunk" target="_blank"><FaInstagram className="hover:text-pink-500 transition-transform hover:scale-110" /></a>
          <a href="https://www.facebook.com/losfalsosband?locale=es_LA" target="_blank"><FaFacebookF className="hover:text-blue-500 transition-transform hover:scale-110" /></a>
          <a href="https://open.spotify.com/intl-es/artist/6uLDG2e6EnGaLJW2D96jDY" target="_blank"><FaSpotify className="hover:text-green-400 transition-transform hover:scale-110" /></a>
          <a href="https://www.youtube.com/@elbelzedistro2406" target="_blank"><FaYoutube className="hover:text-red-600 transition-transform hover:scale-110" /></a>
          <a href="https://music.apple.com/us/artist/los-flechados/1469341637" target="_blank"><FaApple className="hover:scale-110" /></a>
        </div>

        {/* Burger */}
        <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Móvil */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 font-bold uppercase tracking-wider bg-black/90 p-4 rounded-lg border border-red-500">

          <Link href="/" className="hover:text-red-500"
            onClick={(e) => handleNavClick(e, "top")}
          >
            Inicio
          </Link>

          <Link href="/" className="hover:text-red-500"
            onClick={(e) => handleNavClick(e, "conciertos")}
          >
            Conciertos
          </Link>

          <Link href="/" className="hover:text-red-500"
            onClick={(e) => handleNavClick(e, "musica")}
          >
            Música
          </Link>

          <Link href="/discografia" className="hover:text-red-500">
            Discografía
          </Link>

          <a href="https://wa.me/51993469442" target="_blank" className="hover:text-red-500">
            Contacto
          </a>

          <hr className="w-full border-red-600/30 my-4" />

          <div className="flex justify-center space-x-6 text-2xl text-white">
            <FaInstagram className="hover:text-pink-500 hover:scale-110" />
            <FaFacebookF className="hover:text-blue-500 hover:scale-110" />
            <FaSpotify className="hover:text-green-400 hover:scale-110" />
            <FaYoutube className="hover:text-red-600 hover:scale-110" />
            <FaApple className="hover:scale-110" />
          </div>
        </div>
      )}
    </nav>
  );
}

