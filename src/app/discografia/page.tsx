"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import albums from "@/data/albums.json" assert { type: "json" };
import { useMusicPlayer } from "@/components/MusicPlayerContext";

export default function DiscografiaPage() {
  const {
    setCurrentAlbum,
    setCurrentTrackIndex,
    setIsPlaying,
    currentAlbum,
    currentTrackIndex,
  } = useMusicPlayer();

  const [openAlbum, setOpenAlbum] = useState<number | null>(null);

  const renderAlbumCard = (album: (typeof albums)[number], index: number) => {
    const isOpen = openAlbum === index;
    const isCurrent = currentAlbum === index;

    return (
      <div id={`album-${index}`} key={album.id} className="relative">
        <button
          onClick={() => {
            setOpenAlbum(isOpen ? null : index);

            if (currentAlbum !== index) {
              setCurrentAlbum(index);
              setCurrentTrackIndex(0);
              setIsPlaying(true);
            }
          }}
          className={`album-card w-full rounded-2xl overflow-hidden shadow-xl transition duration-300 animate-pop ${
            isCurrent ? "album-active" : "bg-zinc-900 border border-zinc-700"
          }`}
        >
          <img
            src={album.cover}
            alt={album.title}
            className="w-full aspect-square object-cover"
          />
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">{album.title}</h2>
            <ChevronDown
              className={`transition ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="mt-3 border border-zinc-700 rounded-xl p-3 space-y-2 animate-slideFade tracklist-bg">
            {album.tracks.map((track, tIndex) => (
              <button
                key={tIndex}
                onClick={() => {
                  setCurrentAlbum(index);
                  setCurrentTrackIndex(tIndex);
                  setIsPlaying(true);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  currentTrackIndex === tIndex && currentAlbum === index
                    ? "bg-red-600 text-white shadow-lg border-2 border-red-500 animate-pulseRedTrack"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                }`}
              >
                {track.title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const mainAlbum = albums[0];
  const sideAlbums = albums.slice(1, 3);
  const bottomAlbum = albums[3];

  return (
    <main className="min-h-screen w-full 
  bg-[radial-gradient(circle_at_top,#500000,#000000_70%)]
  text-zinc-200 py-20 px-4">


      <div className="max-w-5xl mx-auto">
    <h1
  className="
    text-5xl md:text-6xl font-extrabold text-red-500 text-center mb-16
    drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]
    [text-shadow:_0_0_15px_#000,_0_0_35px_#000]
    animate-titleFloat
  "
>
  -DISCOGRAFIA-
</h1>








        <div className="mb-20 flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="flex-1 flex flex-col gap-10 items-start">
            <div className="w-full max-w-lg md:-rotate-[2deg]">
              {renderAlbumCard(mainAlbum, 0)}
            </div>

            {bottomAlbum && (
              <div className="w-full max-w-lg md:rotate-[1deg] md:translate-y-3">
                {renderAlbumCard(bottomAlbum, 3)}
              </div>
            )}
          </div>

          <div className="mt-8 md:mt-0 flex flex-col gap-10 md:w-[380px]">
            {sideAlbums.map((album, i) => {
              const realIndex = i + 1;
              const tilt =
                realIndex === 1
                  ? "md:rotate-[2deg] md:-translate-y-4"
                  : "md:-rotate-[2deg] md:translate-y-2";

              return (
                <div key={album.id} className={tilt}>
                  {renderAlbumCard(album, realIndex)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
