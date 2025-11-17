"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import concertsData from "@/data/concerts.json";

type Concierto = {
  id: number;
  fecha: string;
  evento: string;
  lugar: string;
  image: string;
  tickets?: string;
};

// Parsear fecha como local (ignora UTC)
function parseLocalDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // mes 0-index
}

// Card para conciertos
function ConciertoCard({ c, past = false }: { c: Concierto; past?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!past ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.4 }}
      className={`border border-red-600 rounded-xl overflow-hidden shadow-lg ${
        past ? "bg-black/40 backdrop-blur" : "bg-zinc-900/90 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      }`}
    >
      {c.image && (
        <div className={past ? "relative w-full aspect-[16/9]" : ""}>
          <Image
            src={c.image}
            alt={c.evento}
            fill={past}
            className={`object-cover ${past ? "rounded-t-xl" : ""}`}
          />
        </div>
      )}

      <div className={past ? "p-5" : ""}>
        {!past && (
          <p className="text-sm text-zinc-400">
            🗓️ {parseLocalDate(c.fecha).toLocaleDateString("es-PE")}
          </p>
        )}
        <h3 className={`text-lg font-bold ${past ? "text-gray-200" : "text-white"}`}>{c.evento}</h3>
        <p className={past ? "text-gray-400" : "text-zinc-400 text-sm"}>{c.lugar}</p>
        {past && (
          <p className="text-gray-500 text-sm">
            📅 {parseLocalDate(c.fecha).toLocaleDateString("es-PE")}
          </p>
        )}

        {!past && c.tickets && (
          <a
            href={c.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-4 py-2 rounded hover:scale-105 transition text-center"
          >
            TICKETS
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ConcertsSection() {
  const [showPast, setShowPast] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // solo día local

  const { futuros, pasados } = useMemo(() => {
    const futuros: Concierto[] = [];
    const pasados: Concierto[] = [];

    for (const c of concertsData as Concierto[]) {
      const fechaC = parseLocalDate(c.fecha);
      if (fechaC >= today) futuros.push(c);
      else pasados.push(c);
    }

    return {
      futuros: futuros.sort((a, b) => parseLocalDate(a.fecha).getTime() - parseLocalDate(b.fecha).getTime()),
      pasados: pasados.sort((a, b) => parseLocalDate(b.fecha).getTime() - parseLocalDate(a.fecha).getTime()),
    };
  }, [concertsData]);

  return (
    <section
      id="conciertos"
      className="relative bg-[radial-gradient(ellipse_at_top,_#991b1b,_#000)] py-20 px-4 text-white border-t border-zinc-900"
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-red-500 tracking-wide drop-shadow">
          🎤 Conciertos
        </h2>

        {/* Conciertos futuros */}
        <div className="space-y-6">
          {futuros.length === 0 ? (
            <p className="text-center text-gray-300">No hay conciertos próximos 🎶</p>
          ) : (
            futuros.map((c) => <ConciertoCard key={c.id} c={c} />)
          )}
        </div>

        {/* Botón para mostrar pasados */}
        {pasados.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowPast(!showPast)}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 transition text-white rounded-full shadow-lg font-semibold"
            >
              {showPast ? "Ocultar conciertos pasados" : "Ver conciertos pasados"}
            </button>
          </div>
        )}

        {/* Conciertos pasados */}
        <AnimatePresence>
          {showPast && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 overflow-hidden"
            >
              <h3 className="text-3xl font-bold text-center text-red-500 mb-6">
                Conciertos Pasados
              </h3>

              <div className="grid gap-6">
                {pasados.map((c) => (
                  <ConciertoCard key={c.id} c={c} past />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
