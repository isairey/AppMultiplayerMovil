import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import SongCard from "../components/SongCard";
import { usePlayer } from "../hooks/usePlayer";

// =========================
// TIPOS
// =========================
interface Song {
  id: string;
  uri: string;
  filename: string;
  artist?: string;
}

interface Artist {
  id: string;
  name: string;
  songs: Song[];
}

export default function ArtistDetail() {
  const { artist } = useLocalSearchParams<{ artist?: string }>();
  const { play, setPlaylist } = usePlayer();

  // =========================
  // SAFE PARSE (evita crash)
  // =========================
  let parsedArtist: Artist | null = null;

  try {
    parsedArtist = artist ? JSON.parse(artist) : null;
  } catch (e) {
    parsedArtist = null;
  }

  if (!parsedArtist) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Error al cargar artista</Text>
      </SafeAreaView>
    );
  }

  const songs: Song[] = parsedArtist.songs ?? [];

  function playSong(index: number) {
    if (!songs.length) return;

    setPlaylist(songs);
    play(songs[index], index);

    router.push("/player");
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </TouchableOpacity>

        <Text style={styles.title}>
          {parsedArtist.name}
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {songs.length} canciones
      </Text>

      {/* LISTA */}
      <FlatList
        data={songs}
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

// =========================
// ESTILOS APPLE CLEAN
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 10,
    color: "#1C1C1E",
  },

  subtitle: {
    color: "#8E8E93",
    marginBottom: 15,
  },

  error: {
    marginTop: 80,
    textAlign: "center",
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});