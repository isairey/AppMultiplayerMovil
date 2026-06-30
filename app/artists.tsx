import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useSongs } from "../hooks/useSongs";

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

export default function ArtistsScreen() {

  const { songs } = useSongs() as { songs: Song[] };

  // =========================
  // AGRUPAR ARTISTAS
  // =========================
  const grouped = songs.reduce<Record<string, Song[]>>((acc, song) => {

    const artistName =
      song.artist ||
      song.filename?.split("-")[0]?.trim() ||
      "Artista desconocido";

    if (!acc[artistName]) {
      acc[artistName] = [];
    }

    acc[artistName].push(song);

    return acc;
  }, {});

  const artists: Artist[] = Object.keys(grouped).map((key) => ({
    id: key,
    name: key,
    songs: grouped[key],
  }));

  // =========================
  // ABRIR ARTISTA
  // =========================
  function openArtist(artist: Artist) {
    router.push({
      pathname: "/artist-detail",
      params: {
        artist: JSON.stringify(artist),
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={26} color="#111" />
        </TouchableOpacity>

        <Text style={styles.title}>
          Artistas
        </Text>

      </View>

      <Text style={styles.subtitle}>
        {artists.length} artista(s)
      </Text>

      {/* LISTA */}
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => openArtist(item)}
          >

            <View style={styles.avatar}>
              <Ionicons name="person" size={34} color="#34C759" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.artistName}>
                {item.name}
              </Text>

              <Text style={styles.songCount}>
                {item.songs.length} canción(es)
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#C7C7CC"
            />

          </TouchableOpacity>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 18,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E8FFF1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  artistName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  songCount: {
    marginTop: 4,
    color: "#8E8E93",
    fontSize: 14,
  },
});