// src/components/VideoSection.tsx
export default function VideoSection() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-center mb-4">Nuevo Videoclip</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/nkOjRszZ5bM"
            title="6 Voltios - Por Siempre (Video Oficial)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
