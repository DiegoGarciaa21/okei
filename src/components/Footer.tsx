import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-10 px-6 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 text-center">

        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Los Falsos — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
