"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
  RefObject,
} from "react";

import albums from "@/data/albums.json";

interface MusicPlayerContextProps {
  audioRef: RefObject<HTMLAudioElement | null>;

  currentAlbum: number | null;
  setCurrentAlbum: (v: number | null) => void;

  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;

  currentTrack: { title: string; src: string } | null;

  shuffleMode: boolean;
  setShuffleMode: (v: boolean) => void;

  shuffleQueue: number[];
  setShuffleQueue: React.Dispatch<React.SetStateAction<number[]>>;

  history: number[];
  setHistory: React.Dispatch<React.SetStateAction<number[]>>;

  // 🔽 Estado global de progreso / duración / volumen / repeat / mute
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;

  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;

  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;

  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;

  repeatMode: "none" | "all" | "one";
  setRepeatMode: React.Dispatch<React.SetStateAction<"none" | "all" | "one">>;

  // Mini / Full
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | null>(null);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [shuffleMode, setShuffleMode] = useState(false);
  const [shuffleQueue, setShuffleQueue] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "all" | "one">("none");

  const [isExpanded, setIsExpanded] = useState(false); // mini por defecto

  // Track actual seguro
  const currentTrack =
    currentAlbum !== null &&
    (albums as any)[currentAlbum] &&
    (albums as any)[currentAlbum].tracks[currentTrackIndex]
      ? (albums as any)[currentAlbum].tracks[currentTrackIndex]
      : null;

  // Autoplay suave cuando cambia de track
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && currentTrack) {
      const timeout = setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 70);

      return () => clearTimeout(timeout);
    }
  }, [currentTrackIndex, isPlaying, currentTrack]);

  // Volumen + mute global
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  return (
    <MusicPlayerContext.Provider
      value={{
        audioRef,
        currentAlbum,
        setCurrentAlbum,
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
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx)
    throw new Error("useMusicPlayer debe usarse dentro de MusicPlayerProvider.");
  return ctx;
};
