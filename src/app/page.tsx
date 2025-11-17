"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import concertsData from "@/data/concerts.json";
import { Rubik_Dirt } from "next/font/google";
const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
})
type Concierto = {
  id: number;
  fecha: string;
  evento: string;
  lugar: string;
  image: string;
  tickets?: string;
};

// -----------------------------
// ⭐ Fecha local corregida
// -----------------------------
function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// -----------------------------
// ⭐ Scroll suave CON OFFSET
// -----------------------------
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = -100; // corrige navbar fijo + animaciones

  const top = el.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({ top, behavior: "smooth" });
}

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen flex flex-col space-y-24 text-white 
      bg-[radial-gradient(circle_at_top_left,_#ef4444_0%,_#0a0a0a_80%)] bg-no-repeat bg-cover"
    >
      {/* ⭐ HERO */}
<motion.section
  id="top"
  className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {/* Fondo */}
  <Image
    src="/hero-bg.jpg"
    alt="Fondo Los Falsos"
    fill
    priority
    className="object-cover object-center z-0"
  />

  {/* Overlay punk */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-red-900/40 z-10"></div>

  {/* Contenido */}
  <motion.div
    className="relative z-30 p-8 rounded-xl text-center backdrop-blur-md bg-black/30 shadow-2xl"
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1.1, ease: 'easeOut' }}
  >
    {/* Título PUNK */}
<motion.h1
  className={`${rubikDirt.className} text-7xl md:text-9xl tracking-wider mb-4 text-red-500 
  drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]
  [text-shadow:_-4px_4px_0_#000,_4px_4px_0_#000,_4px_-4px_0_#000,_-4px_-4px_0_#000]`}
  initial={{ scale: 0.98 }}
  animate={{ y: [0, -3, 0], scale: 1 }}
  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
>
 - Los Falsos -
</motion.h1>

    {/* Subtítulo */}
    <p className="text-white text-lg md:text-xl font-semibold mb-6 tracking-wide">
      Escucha su álbum y conoce a la banda
    </p>

    {/* Botones */}
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <button
        onClick={() => scrollToSection('conciertos')}
        className="bg-red-600 text-black font-bold px-6 py-3 rounded-full text-sm 
                   transition-all flex items-center justify-center gap-2
                   hover:scale-110 hover:-rotate-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
      >
        Ver conciertos
      </button>

      <button
        onClick={() => scrollToSection('musica')}
        className="border border-red-500 text-red-500 px-6 py-3 rounded-full font-bold text-sm 
                   transition-all flex items-center justify-center gap-2
                   hover:bg-red-500 hover:text-black hover:scale-110 hover:rotate-1 
                   hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
      >
        Escuchar ahora
      </button>
    </div>
  </motion.div>
</motion.section>



      {/* ⭐ QUIÉNES SOMOS */}
<motion.section
  id="quienes-somos"
  className="relative py-24 px-6 bg-[radial-gradient(ellipse_at_top,_#7f1d1d,_#000)]
             text-white border-t border-zinc-800"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 z-0"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center">
    {/* Título */}
    <h2 className="text-5xl md:text-6xl font-extrabold text-red-500 drop-shadow
                   mb-10 tracking-wide">
      ¿QUIENES SOMOS?
    </h2>

    {/* Imagen */}
    <div className="w-full max-w-md mx-auto mb-10 rounded-2xl overflow-hidden 
                    shadow-[0_0_25px_rgba(255,0,0,0.5)] border border-red-600">
      <Image
        src="/historia.jpg"
        alt="La banda"
        width={1200}
        height={1200}
        className="object-cover w-full h-full"
      />
    </div>

    {/* Texto mejor presentado */}
    <p
      className="text-zinc-300 text-lg md:text-xl leading-relaxed mx-auto 
                 max-w-3xl px-2
                 bg-black/20 py-6 rounded-xl backdrop-blur-sm border border-zinc-700
                 shadow-inner"
    >
      Hace años, cuando la ciudad parecía repetirse todos los días, decidimos romper el ciclo:
amigos, tragos y una idea loca… armar una banda. No importaba si sonábamos bien o mal,
importaba sentirnos vivos.

Desde el 2007 venimos dándole duro: locales pequeños, amplis fallados, amigos entrando
y saliendo, y un montón de anécdotas que hoy son parte de nuestra identidad. Algunos
compartieron escenario con nosotros y ya no están, pero su energía sigue cargando cada
tema que tocamos.

Somos música hecha desde la calle, desde la amistad y desde las ganas de seguir jodiendo
al destino. Somos Los Falsos, y esta historia recién empieza.

    </p>
  </div>
</motion.section>


      {/* ⭐ INTEGRANTES */}
 <motion.section
  id="integrantes"
  className="relative py-24 px-6 bg-[radial-gradient(ellipse_at_top,_#7f1d1d,_#000)] text-white border-t border-zinc-800"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <div className="absolute inset-0 bg-black/50 z-0"></div>

  <div className="relative z-10 max-w-6xl mx-auto text-center mb-14">
    <h2 className="text-4xl md:text-5xl font-extrabold text-red-500 tracking-wide drop-shadow mb-4">
      INTEGRANTES DE LA BANDA
    </h2>
    <p className="text-zinc-300 max-w-2xl mx-auto">
      Conoce a los músicos detrás del sonido de los falsos.
    </p>
  </div>

  {/* PRIMERA FILA (3 miembros) */}
  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      { nombre: "Johnny Chombo", rol: "Guitarra y Voz", foto: "/integrantes/johnny.jpg" },
      { nombre: "Jorge Hueso", rol: "Bajo y Coros", foto: "/integrantes/jorge.jpg" },
      { nombre: "Mario Pocho", rol: "Batería y Coros", foto: "/integrantes/mario.jpg" },
    ].map((i, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.15 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true }}
        className="bg-zinc-900/80 backdrop-blur-sm border border-red-700 rounded-xl p-5 shadow-xl hover:shadow-red-500/40 transition-all cursor-pointer"
      >
        <div className="rounded-lg overflow-hidden mb-4 border-2 border-red-600">
          <Image
            src={i.foto}
            alt={i.nombre}
            width={400}
            height={450}
            className="object-cover w-full h-[300px]"
          />
        </div>

        <h3 className="text-xl font-bold text-white">{i.nombre}</h3>
        <p className="text-red-400 font-semibold">{i.rol}</p>
      </motion.div>
    ))}
  </div>

  {/* SEGUNDA FILA — SOLO EL ÚLTIMO Y CENTRADO */}
  <div className="relative z-10 max-w-6xl mx-auto flex justify-center mt-12">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
      className="bg-zinc-900/80 backdrop-blur-sm border border-red-700 rounded-xl p-5 shadow-xl hover:shadow-red-500/40 transition-all cursor-pointer max-w-xs"
    >
      <div className="rounded-lg overflow-hidden mb-4 border-2 border-red-600">
        <Image
          src="/integrantes/armando.jpg"
          alt="Armando Belze"
          width={400}
          height={450}
          className="object-cover w-full h-[300px]"
        />
      </div>

      <h3 className="text-xl font-bold text-white text-center">Armando Belze</h3>
      <p className="text-red-400 font-semibold text-center">2da Voz</p>
    </motion.div>
  </div>
</motion.section>



      {/* ⭐ MÚSICA (ajustado espaciado superior + mejor alineación) */}
      <motion.section
        id="musica"
        className="relative py-40 px-6 text-center text-white 
        bg-[radial-gradient(ellipse_at_top,_#b91c1c,_#000)] border-t border-zinc-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Texto */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-5xl md:text-6xl font-extrabold text-red-500 drop-shadow-lg">
              ESCUCHA EL NUEVO ALBUM
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
              El álbum más potente de Los Falsos ya está en Spotify.
            </p>
            <a
              href="https://open.spotify.com/intl-es/artist/6uLDG2e6EnGaLJW2D96jDY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 text-black px-8 py-3 
              rounded-full font-bold uppercase text-sm hover:bg-red-400 transition mx-auto md:mx-0"
            >
              Ver discografía completa
            </a>
          </div>

          {/* Spotify Embed */}
          <motion.div
            className="md:w-1/2 w-full rounded-xl shadow-xl overflow-hidden border border-red-500"
            whileHover={{ scale: 1.02 }}
          >
            <iframe
              className="w-full h-[500px] md:h-[550px]"
              src="https://open.spotify.com/embed/album/5TGCmInnM8YdjZVVJlreej?utm_source=generator"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* ⭐ CONCIERTOS (ACTUALIZADO + corregido scroll) */}
      <Conciertos />
    </main>
  );
}

// ===================================================
// 🎫 CONCIERTOS (CORREGIDO scroll + expansión pasados)
// ===================================================
function Conciertos() {
  const [showPast, setShowPast] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
  }, []);

  // ⭐ Reajuste de scroll cada vez que se abra "conciertos pasados"
  useEffect(() => {
    if (showPast) {
      setTimeout(() => {
        scrollToSection("conciertos");
      }, 200);
    }
  }, [showPast]);

  const { futuros, pasados } = useMemo(() => {
    if (!today) return { futuros: [], pasados: [] };

    const futuros: Concierto[] = [];
    const pasados: Concierto[] = [];

    for (const c of concertsData) {
      const f = parseLocalDate(c.fecha);
      if (f >= today) futuros.push(c);
      else pasados.push(c);
    }

    return {
      futuros: futuros.sort((a, b) => parseLocalDate(a.fecha).getTime() - parseLocalDate(b.fecha).getTime()),
      pasados: pasados.sort((a, b) => parseLocalDate(b.fecha).getTime() - parseLocalDate(a.fecha).getTime()),
    };
  }, [today]);

  return (
    <motion.section
      id="conciertos"
      className="relative bg-[radial-gradient(ellipse_at_top,_#991b1b,_#000)]
      py-32 px-4 text-white border-t border-zinc-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-red-500 drop-shadow">
          CONCIERTOS
        </h2>

        {/* FUTUROS */}
        <div className="space-y-6">
          {futuros.length === 0 && (
            <p className="text-center text-gray-300">No hay conciertos próximos </p>
          )}

          {futuros.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900/90 p-6 rounded-xl flex flex-col md:flex-row md:items-center 
              justify-between gap-4 shadow-md border border-red-700"
            >
              <div>
                <p className="text-sm text-zinc-400">
                  🗓️ {parseLocalDate(c.fecha).toLocaleDateString("es-PE")}
                </p>
                <h3 className="text-white font-bold text-lg">{c.evento}</h3>
                <p className="text-zinc-400 text-sm">📍 {c.lugar}</p>
              </div>

              {c.tickets && (
                <a
                  href={c.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold 
                  px-4 py-2 rounded hover:scale-105 transition text-center"
                >
                  TICKETS
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* BOTÓN PASADOS */}
        {pasados.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowPast(!showPast)}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 transition text-white 
              rounded-full shadow-lg font-semibold"
            >
              {showPast ? "Ocultar conciertos pasados" : "Ver conciertos pasados"}
            </button>
          </div>
        )}

        {/* PASADOS */}
        <AnimatePresence>
          {showPast && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 overflow-hidden"
            >
              <h3 className="text-3xl font-bold text-center text-red-500 mb-8">
                Conciertos Pasados
              </h3>

              <div className="grid gap-6">
                {pasados.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border border-red-600 rounded-xl overflow-hidden shadow-lg bg-black/40 backdrop-blur"
                  >
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={c.image}
                        alt={c.evento}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-200">{c.evento}</h3>
                      <p className="text-gray-400">{c.lugar}</p>
                      <p className="text-gray-500 text-sm">
                        📅 {parseLocalDate(c.fecha).toLocaleDateString("es-PE")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
