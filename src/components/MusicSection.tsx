// src/components/MusicSection.tsx
export default function MusicSection() {
  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <a
          href="#"
          className="border border-white px-4 py-2 text-xs uppercase tracking-wider rounded hover:bg-white hover:text-black transition"
        >
          Visita la tienda
        </a>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Música</h2>
      <div className="flex justify-center mb-6">
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/album/4uMO4IocT4ecXnSzzAEXC5?utm_source=generator"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      <div className="text-center">
        <a
          href="#"
          className="border border-white px-4 py-2 text-xs uppercase tracking-wider rounded hover:bg-white hover:text-black transition"
        >
          Todos los discos aquí
        </a>
      </div>
    </section>
  );
}
