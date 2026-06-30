import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export interface Song {
  id: string;
  filename: string;
  uri: string;
  duration: number;
  mediaType: MediaLibrary.MediaTypeValue;
  creationTime: number;
  modificationTime: number;
}

export function useSongs() {

  const [songs, setSongs] = useState<Song[]>([]);

  const [loading, setLoading] = useState(true);

  const [permissionGranted, setPermissionGranted] = useState(false);

  // ===========================
  // CARGAR MÚSICA
  // ===========================

  async function loadSongs() {

    try {

      setLoading(true);

      const permission =
        await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {

        setPermissionGranted(false);

        setLoading(false);

        return;

      }

      setPermissionGranted(true);

      const result =
        await MediaLibrary.getAssetsAsync({

          mediaType: "audio",

          first: 1000,

          sortBy: [
            MediaLibrary.SortBy.creationTime
          ]

        });

      const music: Song[] = result.assets.map(asset => ({

        id: asset.id,

        filename: asset.filename,

        uri: asset.uri,

        duration: asset.duration ?? 0,

        mediaType: asset.mediaType,

        creationTime: asset.creationTime,

        modificationTime: asset.modificationTime

      }));

      setSongs(music);

    } catch (error) {

      console.log("Error leyendo canciones:", error);

    } finally {

      setLoading(false);

    }

  }

  // ===========================
  // RECARGAR
  // ===========================

  async function refresh() {

    await loadSongs();

  }

  // ===========================
  // BUSCAR
  // ===========================

  function search(text: string) {

    if (!text.trim()) return songs;

    return songs.filter(song =>

      song.filename
        .toLowerCase()
        .includes(text.toLowerCase())

    );

  }

  // ===========================
  // CANCIONES RECIENTES
  // ===========================

  function recent(limit = 20) {

    return [...songs]

      .sort(
        (a, b) =>
          b.creationTime - a.creationTime
      )

      .slice(0, limit);

  }

  // ===========================
  // AL CARGAR
  // ===========================

  useEffect(() => {

    loadSongs();

  }, []);

  return {

    songs,

    loading,

    permissionGranted,

    refresh,

    search,

    recent

  };

}