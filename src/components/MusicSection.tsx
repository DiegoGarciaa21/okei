export default function MusicSection() {
  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <a
          href="/tienda"
          className="border border-white px-4 py-2 text-xs uppercase tracking-wider rounded hover:bg-white hover:text-black transition"
        >
          Visita la tienda
        </a>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Música</h2>

      <div className="w-full max-w-xl mx-auto aspect-[4/1] overflow-hidden rounded-xl mb-6">
        <iframe
          className="w-full h-full"
          src="https://open.spotify.com/embed/album/4uMO4IocT4ecXnSzzAEXC5?utm_source=generator"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      <div className="text-center">
        <a
          href="/discografia"
          className="border border-white px-4 py-2 text-xs uppercase tracking-wider rounded hover:bg-white hover:text-black transition"
        >
          Todos los discos aquí
        </a>
      </div>
    </section>
  );
}
