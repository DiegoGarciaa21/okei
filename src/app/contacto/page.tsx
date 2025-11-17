'use client';

import { motion } from 'framer-motion';

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white bg-[radial-gradient(ellipse_at_top,_#991b1b,_#000)] px-4 py-24">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Contenido */}
      <motion.div
        className="relative z-10 max-w-2xl w-full bg-zinc-900/80 backdrop-blur-md rounded-xl p-10 shadow-xl space-y-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-extrabold text-red-500 uppercase tracking-wide text-center">
          Contacto
        </h1>

        <p className="text-zinc-300 text-center text-lg">
          ¿Quieres escribirnos? Llena el formulario o contáctanos directamente por redes sociales.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-white">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-semibold text-white">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 text-black font-bold px-6 py-2 rounded-full hover:bg-red-600 transition uppercase text-sm tracking-wide"
            >
              Enviar
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
