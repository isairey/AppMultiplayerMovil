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

    // acciones player
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
    updateProgress,

    // ❤️ favoritos (FALTABAN)
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
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

    // ❤️ estado favoritos
    favorites,
    isFavorite,

    // Acciones principales player
    play,
    pause,
    resume,
    stop,
    next,
    previous,
    seekTo,

    // Extras player
    setPlaylist,
    toggleShuffle,
    toggleRepeat,
    setVolume,
    updateProgress,

    // ❤️ acciones favoritos
    addFavorite,
    removeFavorite,
  };
}