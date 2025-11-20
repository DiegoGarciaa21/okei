"use client";

import { useMusicPlayer } from "@/components/MusicPlayerContext";
import {
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import albums from "@/data/albums.json";

export default function MusicPlayer() {
  const {
    audioRef,
    currentAlbum,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    currentTrack,
    shuffleMode,
    setShuffleMode,
    shuffleQueue,
    setShuffleQueue,
    history,
    setHistory,
    progress,
    setProgress,
    duration,
    setDuration,
    volume,
    setVolume,
    muted,
    setMuted,
    repeatMode,
    setRepeatMode,
    isExpanded,
    setIsExpanded,
  } = useMusicPlayer();

  const pathname = usePathname();
  const router = useRouter();

  // Datos del álbum para la portada (si existe)
  const currentAlbumData =
    currentAlbum !== null ? (albums as any)[currentAlbum] : null;
  const coverSrc =
    currentAlbumData && currentAlbumData.cover ? currentAlbumData.cover : null;

  // Helper shuffle puro
  const shuffleArray = (arr: number[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // ==========================
  // LÓGICA PRINCIPAL (useCallback)
  // ==========================

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [audioRef, isPlaying, setIsPlaying]);

  const nextTrack = useCallback(() => {
    if (currentAlbum === null) return;

    const tracks = (albums as any)[currentAlbum].tracks;

    if (shuffleMode && shuffleQueue.length > 0) {
      const idx = shuffleQueue.indexOf(currentTrackIndex);
      const next = shuffleQueue[idx + 1];

      setHistory((h) => [...h, currentTrackIndex]);

      if (next !== undefined) {
        setCurrentTrackIndex(next);
        setIsPlaying(true);
        return;
      }

      const newOrder = shuffleArray(
        Array.from({ length: tracks.length }, (_, i) => i)
      );

      setShuffleQueue(newOrder);
      setHistory((h) => [...h, currentTrackIndex]);
      setCurrentTrackIndex(newOrder[0]);
      setIsPlaying(true);
      return;
    }

    setHistory((h) => [...h, currentTrackIndex]);
    setCurrentTrackIndex((prev) =>
      prev < tracks.length - 1 ? prev + 1 : prev
    );
  }, [
    currentAlbum,
    currentTrackIndex,
    shuffleMode,
    shuffleQueue,
    setHistory,
    setCurrentTrackIndex,
    setIsPlaying,
  ]);

  const prevTrack = useCallback(() => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentTrackIndex(last);
      setIsPlaying(true);
      return;
    }

    setCurrentTrackIndex((prev) => Math.max(prev - 1, 0));
  }, [history, setHistory, setCurrentTrackIndex, setIsPlaying]);

  const toggleShuffle = useCallback(() => {
    if (currentAlbum === null) return;
    const tracks = (albums as any)[currentAlbum].tracks.length;

    if (!shuffleMode) {
      const order = shuffleArray(
        Array.from({ length: tracks }, (_, i) => i)
      );

      if (order[0] === currentTrackIndex && order.length > 1) {
        [order[0], order[order.length - 1]] = [
          order[order.length - 1],
          order[0],
        ];
      }

      setShuffleQueue(order);
      setHistory([]);
      setShuffleMode(true);
    } else {
      setShuffleMode(false);
      setShuffleQueue([]);
      setHistory([]);
    }
  }, [
    currentAlbum,
    shuffleMode,
    currentTrackIndex,
    setShuffleQueue,
    setHistory,
    setShuffleMode,
  ]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) =>
      prev === "none" ? "all" : prev === "all" ? "one" : "none"
    );
  }, [setRepeatMode]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  }, [audioRef, setProgress]);

  const handleLoaded = useCallback(() => {
    if (audioRef.current) setDuration(audioRef.current.duration || 0);
  }, [audioRef, setDuration]);

  const handleEnded = useCallback(() => {
    if (!audioRef.current || currentAlbum === null) return;

    const tracks = (albums as any)[currentAlbum].tracks;

    if (shuffleMode && shuffleQueue.length > 0) {
      nextTrack();
      return;
    }

    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }

    if (repeatMode === "all") {
      if (currentTrackIndex < tracks.length - 1) {
        nextTrack();
      } else {
        setCurrentTrackIndex(0);
        setIsPlaying(true);
      }
      return;
    }

    setIsPlaying(false);
  }, [
    audioRef,
    currentAlbum,
    currentTrackIndex,
    shuffleMode,
    shuffleQueue,
    repeatMode,
    nextTrack,
    setCurrentTrackIndex,
    setIsPlaying,
  ]);

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPct =
    duration && !isNaN(duration) ? (progress / duration) * 100 : 0;

  // 🔗 Ir a la discografía al álbum actual
  const goToCurrentAlbum = useCallback(() => {
    if (currentAlbum === null) {
      router.push("/discografia");
      return;
    }
    router.push(`/discografia#album-${currentAlbum}`);
  }, [router, currentAlbum]);

  // ==========================
  // AUTO-MINI POR RUTA
  // ==========================
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname, setIsExpanded]);

  // ==========================
  // ATAJOS DE TECLADO
  // ==========================
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Play / Pause (Space)
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
        return;
      }

      // Next Track (Shift + ArrowRight)
      if (e.shiftKey && e.code === "ArrowRight") {
        e.preventDefault();
        nextTrack();
        return;
      }

      // Prev Track (Shift + ArrowLeft)
      if (e.shiftKey && e.code === "ArrowLeft") {
        e.preventDefault();
        prevTrack();
        return;
      }

      // Volume Up (ArrowUp)
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setVolume((v) => Math.min(1, v + 0.05));
        return;
      }

      // Volume Down (ArrowDown)
      if (e.code === "ArrowDown") {
        e.preventDefault();
        setVolume((v) => Math.max(0, v - 0.05));
        return;
      }

      // Mute (M)
      if (e.key.toLowerCase() === "m") {
        setMuted((m) => !m);
        return;
      }

      // Expand (E)
      if (e.key.toLowerCase() === "e") {
        setIsExpanded(true);
        return;
      }

      // Collapse (Escape)
      if (e.code === "Escape") {
        setIsExpanded(false);
        return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [togglePlay, nextTrack, prevTrack, setVolume, setMuted, setIsExpanded]);

  if (!currentTrack) return null;

  // ==========================
  // RENDER
  // ==========================

  return (
    <div
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] ${
        isExpanded ? "max-w-3xl" : "max-w-xl"
      }`}
    >
      <div
        className={
          isExpanded
            ? "music-player bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 p-6 rounded-3xl shadow-2xl flex flex-col gap-5"
            : "music-player bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 px-3 py-2 rounded-2xl shadow-2xl flex items-center gap-3"
        }
      >
        {/* ============= MINI PLAYER ============= */}
        {!isExpanded && (
          <div className="flex items-center gap-3 w-full">
            {/* Portada clickable → discografía */}
            <button
              type="button"
              onClick={goToCurrentAlbum}
              className="shrink-0"
            >
              {coverSrc ? (
                <img
                  src={coverSrc}
                  alt={currentTrack.title}
                  className="w-10 h-10 rounded-md object-cover border border-zinc-700"
                />
              ) : (
                <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center text-xs font-bold">
                  LF
                </div>
              )}
            </button>

            {/* Info + mini barra (click → expand) */}
            <button
              onClick={() => setIsExpanded(true)}
              className="flex-1 flex flex-col items-start text-left gap-1 overflow-hidden"
            >
              <span className="text-[10px] uppercase tracking-wide text-zinc-400">
                Reproduciendo ahora
              </span>
              <span className="text-sm font-semibold truncate">
                {currentTrack.title}
              </span>

              <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 bg-red-600 rounded-full shadow hover:bg-red-700 transition shrink-0"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Expandir */}
            <button
              onClick={() => setIsExpanded(true)}
              className="text-zinc-300 hover:text-white transition shrink-0"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        )}

        {/* ============= FULL PLAYER ============= */}
        {isExpanded && (
          <>
            {/* Header: título + colapsar */}
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white tracking-wide truncate">
                {currentTrack.title}
              </h2>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                <ChevronDown size={22} />
              </button>
            </div>

            {/* Progreso */}
            <div className="flex items-center gap-4 h-8 px-4">
              <span className="text-xs sm:text-sm text-zinc-400 w-16 text-right">
                {formatTime(progress)}
              </span>

              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (audioRef.current) audioRef.current.currentTime = v;
                  setProgress(v);
                }}
                className="slider-red w-full h-2 flex-1"
                style={
                  {
                    ["--progress" as string]: `${
                      duration ? (progress / duration) * 100 : 0
                    }%`,
                  } as CSSProperties
                }
              />

              <span className="text-xs sm:text-sm text-zinc-400 w-16">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controles */}
            <div className="flex justify-center items-center h-16 gap-10">
              {/* Shuffle */}
              <button
                onClick={toggleShuffle}
                className={`transition ${
                  shuffleMode
                    ? "text-red-500 -ml-4"
                    : "text-zinc-300 hover:text-white -ml-4"
                }`}
              >
                <Shuffle size={24} />
              </button>

              {/* Central controls */}
              <div className="flex items-center gap-8">
                <button
                  onClick={prevTrack}
                  className="text-zinc-300 hover:text-white"
                >
                  <SkipBack size={26} />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-4 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition"
                >
                  {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                </button>

                <button
                  onClick={nextTrack}
                  className="text-zinc-300 hover:text-white"
                >
                  <SkipForward size={26} />
                </button>
              </div>

              {/* Repeat */}
              <button
                onClick={toggleRepeat}
                className={`relative transition ${
                  repeatMode !== "none"
                    ? "text-red-500 -mr-4"
                    : "text-zinc-300 hover:text-white -mr-4"
                }`}
              >
                <Repeat size={24} />
                {repeatMode === "one" && (
                  <span className="absolute -top-1 -right-2 text-[11px] font-bold text-red-500">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Volumen + mute */}
            <div className="flex items-center gap-4 h-10 px-6">
              <button
                onClick={() => setMuted(!muted)}
                className="text-zinc-300 hover:text-white transition"
              >
                {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className={`slider-red w-full h-2 flex-1 ${
                  muted ? "muted" : ""
                }`}
                style={
                  {
                    ["--progress" as string]: `${volume * 100}%`,
                  } as CSSProperties
                }
              />
            </div>
          </>
        )}
      </div>

      {/* Audio único compartido */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
      />
    </div>
  );
}

