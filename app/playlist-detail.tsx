import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import SongCard from "../components/SongCard";
import { usePlayer } from "../hooks/usePlayer";
import { useSongs } from "../hooks/useSongs";

export default function PlaylistDetail() {
  const { id, name } = useLocalSearchParams();
  const { songs } = useSongs();
  const { play, setPlaylist } = usePlayer();

  // 🔥 FILTRO SIMPLE (puedes hacerlo inteligente después)
  let filteredSongs = songs;

  if (id === "favorites") {
    filteredSongs = songs.filter((s: any) => s.favorite);
  }

  if (id === "recent") {
    filteredSongs = [...songs].slice(-10);
  }

  if (id === "added") {
    filteredSongs = [...songs].reverse();
  }

  if (id === "top") {
    filteredSongs = songs;
  }

  function playSong(index: number) {
    if (!filteredSongs.length) return;

    setPlaylist(filteredSongs);
    play(filteredSongs[index], index);

    router.push("/player");
  }

  return (
    <SafeAreaView style={styles.container}>

      <Ionicons
        name="chevron-back"
        size={26}
        onPress={() => router.back()}
      />

      <Text style={styles.title}>
        {name}
      </Text>

      <Text style={styles.subtitle}>
        {filteredSongs.length} canciones
      </Text>

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongCard
            song={item}
            onPress={() => playSong(index)}
          />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 20,
    paddingTop: 55,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  subtitle: {
    color: "#8E8E93",
    marginBottom: 15,
  },
});