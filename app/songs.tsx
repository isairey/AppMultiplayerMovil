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

import MiniPlayer from "../components/MiniPlayer";
import SongCard from "../components/SongCard";

import { usePlayer } from "../hooks/usePlayer";
import { useSongs } from "../hooks/useSongs";

export default function SongsScreen() {

  const { songs } = useSongs();

  const {
    play,
    setPlaylist
  } = usePlayer();

  async function playSong(index: number) {

    setPlaylist(songs);

    await play(songs[index], index);

    router.push("/player");

  }

  return (

    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >

          <Ionicons
            name="chevron-back"
            size={26}
            color="#111"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          Canciones
        </Text>

      </View>

      <Text style={styles.subtitle}>
        {songs.length} canciones encontradas
      </Text>

      <FlatList

        data={songs}

        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 120
        }}

        renderItem={({ item, index }) => (

          <SongCard

            song={item}

            onPress={() => playSong(index)}

          />

        )}

        ListEmptyComponent={

          <View style={styles.empty}>

            <Ionicons
              name="musical-notes-outline"
              size={80}
              color="#C7C7CC"
            />

            <Text style={styles.emptyTitle}>
              No hay canciones
            </Text>

            <Text style={styles.emptySubtitle}>
              Agrega música al dispositivo para verla aquí.
            </Text>

          </View>

        }

      />

      <MiniPlayer />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#F5F5F7",

    paddingTop: 55,

    paddingHorizontal: 20

  },

  header: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 12

  },

  backButton: {

    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 15,

    elevation: 4,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 3

    }

  },

  title: {

    fontSize: 32,

    fontWeight: "700",

    color: "#111827"

  },

  subtitle: {

    fontSize: 15,

    color: "#6B7280",

    marginBottom: 20

  },

  empty: {

    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 120

  },

  emptyTitle: {

    fontSize: 22,

    fontWeight: "700",

    color: "#111827",

    marginTop: 20

  },

  emptySubtitle: {

    marginTop: 10,

    textAlign: "center",

    color: "#6B7280",

    fontSize: 15,

    lineHeight: 22,

    paddingHorizontal: 40

  }

});