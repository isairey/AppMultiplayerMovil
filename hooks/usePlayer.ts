import { usePlayerStore } from "../store/playerStore";

export interface Song {
  id: string;
  uri: string;
  filename: string;
  duration?: number;
}

export function usePlayer() {
  const {

    currentSong,

    playlist,

    currentIndex,

    isPlaying,

    duration,

    position,

    shuffle,

    repeat,

    volume,

    play,

    pause,

    resume,

    stop,

    next,

    previous,

    seekTo,

    setPlaylist,

    toggleShuffle,

    toggleRepeat,

    setVolume,

    updateProgress

  } = usePlayerStore();

  return {

    // Estado actual
    currentSong,
    playlist,
    currentIndex,
    isPlaying,
    duration,
    position,
    shuffle,
    repeat,
    volume,

    // Acciones principales
    play,
    pause,
    resume,
    stop,
    next,
    previous,
    seekTo,

    // Extras
    setPlaylist,
    toggleShuffle,
    toggleRepeat,
    setVolume,
    updateProgress
  };
}