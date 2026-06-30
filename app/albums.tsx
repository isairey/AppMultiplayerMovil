import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import AlbumCard from "../components/AlbumCard";
import { useSongs } from "../hooks/useSongs";

interface Song {
  id: string;
  uri: string;
  filename: string;
  album?: string;
}

interface Album {
  id: string;
  title: string;
  songs: Song[];
}

export default function AlbumsScreen() {
  const router = useRouter();
  const { songs } = useSongs() as { songs: Song[] };

  // =========================
  // AGRUPAR ÁLBUMES
  // =========================
  const grouped = songs.reduce<Record<string, Song[]>>((acc, song) => {
    const albumName =
      (song as any).album ||
      song.filename?.split("-")[0]?.trim() ||
      "Sin álbum";

    if (!acc[albumName]) {
      acc[albumName] = [];
    }

    acc[albumName].push(song);
    return acc;
  }, {});

  const albums: Album[] = Object.keys(grouped).map((key) => ({
    id: key,
    title: key,
    songs: grouped[key],
  }));

  // =========================
  // ABRIR ALBUM (SAFE ROUTING)
  // =========================
  function openAlbum(album: Album) {
  router.push({
    pathname: "/album-detail",
    params: {
      id: album.id,
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

        <Text style={styles.title}>Álbumes</Text>
      </View>

      <Text style={styles.subtitle}>
        {albums.length} álbum(es)
      </Text>

      {/* LISTA */}
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          paddingBottom: 40,
          gap: 12,
        }}
        renderItem={({ item }) => (
          <AlbumCard
            album={{
              id: item.id,
              title: item.title,
              songs: item.songs.length,
            }}
            onPress={() => openAlbum(item)}
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 18,
  },

  // FlatList spacing
  listContent: {
    paddingBottom: 40,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 14,
  },

  // Empty state
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 30,
  },

});