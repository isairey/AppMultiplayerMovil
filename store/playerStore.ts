import { create } from "zustand";
import { Song } from "../hooks/useSongs";
import AudioService from "../services/AudioService";

interface PlayerState {
  // Estado
  currentSong: Song | null;
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  duration: number;
  position: number;
  shuffle: boolean;
  repeat: boolean;
  volume: number;

  // ❤️ FAVORITOS
  favorites: Song[];

  // Acciones player
  setPlaylist: (songs: Song[]) => void;
  play: (song: Song, index?: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  stop: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  seekTo: (value: number) => Promise<void>;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (value: number) => Promise<void>;
  updateProgress: () => Promise<void>;

  // ❤️ FAVORITOS ACTIONS
  addFavorite: (song: Song) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({

  // =========================
  // STATE
  // =========================
  currentSong: null,
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  duration: 0,
  position: 0,
  shuffle: false,
  repeat: false,
  volume: 1,

  favorites: [],

  // =========================
  // PLAYLIST
  // =========================
  setPlaylist: (songs) => {
    set({ playlist: songs });
  },

  play: async (song, index = 0) => {
    await AudioService.load(song.uri);

    set({
      currentSong: song,
      currentIndex: index,
      isPlaying: true,
      position: 0,
    });
  },

  pause: async () => {
    await AudioService.pause();
    set({ isPlaying: false });
  },

  resume: async () => {
    await AudioService.play();
    set({ isPlaying: true });
  },

  stop: async () => {
    await AudioService.stop();
    set({
      isPlaying: false,
      position: 0,
    });
  },

  seekTo: async (value) => {
    await AudioService.seek(value);
    set({ position: value });
  },

  toggleShuffle: () => {
    set({ shuffle: !get().shuffle });
  },

  toggleRepeat: () => {
    set({ repeat: !get().repeat });
  },

  setVolume: async (value) => {
    await AudioService.setVolume(value);
    set({ volume: value });
  },

  updateProgress: async () => {
    const position = await AudioService.getPosition();
    const duration = await AudioService.getDuration();
    const playing = await AudioService.isPlaying();

    set({
      position,
      duration,
      isPlaying: playing,
    });
  },

  // =========================
  // NEXT
  // =========================
  next: async () => {
    const { playlist, currentIndex, shuffle, repeat } = get();

    if (!playlist.length) return;

    let nextIndex = currentIndex;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex++;

      if (nextIndex >= playlist.length) {
        nextIndex = repeat ? 0 : currentIndex;
      }
    }

    const song = playlist[nextIndex];

    await AudioService.load(song.uri);

    set({
      currentSong: song,
      currentIndex: nextIndex,
      isPlaying: true,
      position: 0,
    });
  },

  // =========================
  // PREVIOUS
  // =========================
  previous: async () => {
    const { playlist, currentIndex, shuffle, repeat } = get();

    if (!playlist.length) return;

    let prevIndex = currentIndex;

    if (shuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex--;

      if (prevIndex < 0) {
        prevIndex = repeat ? playlist.length - 1 : 0;
      }
    }

    const song = playlist[prevIndex];

    await AudioService.load(song.uri);

    set({
      currentSong: song,
      currentIndex: prevIndex,
      isPlaying: true,
      position: 0,
    });
  },

  // =========================
  // ❤️ FAVORITOS
  // =========================
  addFavorite: (song) => {
    const { favorites } = get();

    const exists = favorites.find((s) => s.id === song.id);
    if (exists) return;

    set({
      favorites: [...favorites, song],
    });
  },

  removeFavorite: (id) => {
    set({
      favorites: get().favorites.filter((s) => s.id !== id),
    });
  },

  isFavorite: (id) => {
    return get().favorites.some((s) => s.id === id);
  },
}));