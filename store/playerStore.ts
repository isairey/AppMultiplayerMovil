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

  // Acciones
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

}

export const usePlayerStore = create<PlayerState>((set, get) => ({

  currentSong: null,

  playlist: [],

  currentIndex: 0,

  isPlaying: false,

  duration: 0,

  position: 0,

  shuffle: false,

  repeat: false,

  volume: 1,

  setPlaylist: (songs) => {

    set({

      playlist: songs

    });

  },

  play: async (song, index = 0) => {

    await AudioService.load(song.uri);

    set({

      currentSong: song,

      currentIndex: index,

      isPlaying: true,

      position: 0

    });

  },

  pause: async () => {

    await AudioService.pause();

    set({

      isPlaying: false

    });

  },

  resume: async () => {

    await AudioService.play();

    set({

      isPlaying: true

    });

  },

  stop: async () => {

    await AudioService.stop();

    set({

      isPlaying: false,

      position: 0

    });

  },

  seekTo: async (value) => {

    await AudioService.seek(value);

    set({

      position: value

    });

  },

  toggleShuffle: () => {

    set({

      shuffle: !get().shuffle

    });

  },

  toggleRepeat: () => {

    set({

      repeat: !get().repeat

    });

  },

  setVolume: async (value) => {

    await AudioService.setVolume(value);

    set({

      volume: value

    });

  },

  updateProgress: async () => {

    const position = await AudioService.getPosition();

    const duration = await AudioService.getDuration();

    const playing = await AudioService.isPlaying();

    set({

      position,

      duration,

      isPlaying: playing

    });

  },

  next: async () => {

    const {

      playlist,

      currentIndex,

      shuffle,

      repeat

    } = get();

    if (!playlist.length) return;

    let nextIndex = currentIndex;

    if (shuffle) {

      nextIndex = Math.floor(

        Math.random() * playlist.length

      );

    } else {

      nextIndex++;

      if (nextIndex >= playlist.length) {

        nextIndex = repeat

          ? 0

          : currentIndex;

      }

    }

    const song = playlist[nextIndex];

    await AudioService.load(song.uri);

    set({

      currentSong: song,

      currentIndex: nextIndex,

      isPlaying: true,

      position: 0

    });

  },

  previous: async () => {

    const {

      playlist,

      currentIndex,

      shuffle,

      repeat

    } = get();

    if (!playlist.length) return;

    let previousIndex = currentIndex;

    if (shuffle) {

      previousIndex = Math.floor(

        Math.random() * playlist.length

      );

    } else {

      previousIndex--;

      if (previousIndex < 0) {

        previousIndex = repeat

          ? playlist.length - 1

          : 0;

      }

    }

    const song = playlist[previousIndex];

    await AudioService.load(song.uri);

    set({

      currentSong: song,

      currentIndex: previousIndex,

      isPlaying: true,

      position: 0

    });

  }

}));