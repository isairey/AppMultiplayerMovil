import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import SongCard from "../components/SongCard";
import { usePlayer } from "../hooks/usePlayer";
import { useSongs } from "../hooks/useSongs";

export default function AlbumDetail() {

  // 👇 recibes SOLO el id (NO JSON)
  const { id } = useLocalSearchParams<{ id: string }>();

  const { songs } = useSongs();
  const { play, setPlaylist } = usePlayer();

  // 🔥 reconstruimos el álbum desde la lista global
  const albumSongs = songs.filter((song) => {
    const albumName =
      (song as any).album ||
      song.filename?.split("-")[0]?.trim() ||
      "Sin álbum";

    return albumName === id;
  });

  // 🎧 reproducir canción
  function playSong(index: number) {
    setPlaylist(albumSongs);
    play(albumSongs[index], index);

    router.push("/player");
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {id ?? "Álbum"}
        </Text>

        <Text style={styles.subtitle}>
          {albumSongs.length} canciones
        </Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={albumSongs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item, index }) => (
          <SongCard
            song={item}
            onPress={() => playSong(index)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No hay canciones en este álbum
            </Text>
          </View>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#8E8E93",
  },

  empty: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyText: {
    color: "#8E8E93",
    fontSize: 15,
  },
});