import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import MiniPlayer from "../components/MiniPlayer";
import SongCard from "../components/SongCard";

import { usePlayer } from "../hooks/usePlayer";
import { useSongs } from "../hooks/useSongs";

export default function Home() {

  const { songs } = useSongs();

  const { play, setPlaylist } = usePlayer();

  async function playSong(index: number) {

    const song = songs[index];

    setPlaylist(songs);

    await play(song, index);

    router.push("/player");

  }

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Mi Música
      </Text>

      <Text style={styles.subtitle}>
        {songs.length} canciones disponibles
      </Text>

      {/* Barra de búsqueda */}

      <Pressable style={styles.searchBar}>

        <Ionicons
          name="search"
          size={20}
          color="#999"
        />

        <Text style={styles.searchText}>
          Buscar canciones
        </Text>

      </Pressable>

      {/* Biblioteca */}

      <View style={styles.libraryCard}>

        <View style={styles.iconCircle}>

          <Ionicons
            name="musical-notes"
            size={38}
            color="#FF2D55"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.libraryTitle}>
            Biblioteca Local
          </Text>

          <Text style={styles.librarySubtitle}>
            Toda la música almacenada en tu dispositivo.
          </Text>

        </View>

      </View>

      {/* Botones */}

      <View style={styles.actions}>

        <Pressable
          style={styles.playButton}
          onPress={() => songs.length && playSong(0)}
        >

          <Ionicons
            name="play"
            size={20}
            color="#FFF"
          />

          <Text style={styles.playText}>
            Reproducir
          </Text>

        </Pressable>

        <Pressable style={styles.shuffleButton}>

          <Ionicons
            name="shuffle"
            size={20}
            color="#FF2D55"
          />

        </Pressable>

      </View>

      <Text style={styles.section}>
        Canciones
      </Text>

      <FlatList

        data={songs}

        keyExtractor={(item) => item.id}

        contentContainerStyle={{
          paddingBottom: 120
        }}

        showsVerticalScrollIndicator={false}

        renderItem={({ item, index }) => (

          <SongCard

            song={item}

            onPress={() => playSong(index)}

          />

        )}

      />

      <MiniPlayer />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#F5F5F7",

    paddingHorizontal: 22,

    paddingTop: 55

  },

  title: {

    fontSize: 38,

    fontWeight: "700",

    color: "#111827"

  },

  subtitle: {

    fontSize: 16,

    color: "#6B7280",

    marginTop: 5,

    marginBottom: 25

  },

  searchBar: {

    height: 52,

    backgroundColor: "#ECECEC",

    borderRadius: 18,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 18,

    marginBottom: 25

  },

  searchText: {

    marginLeft: 10,

    color: "#9CA3AF",

    fontSize: 16

  },

  libraryCard: {

    backgroundColor: "#FFF",

    borderRadius: 25,

    padding: 20,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 25,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {

      width: 0,

      height: 5

    },

    elevation: 5

  },

  iconCircle: {

    width: 70,

    height: 70,

    borderRadius: 35,

    backgroundColor: "#FFE4EC",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 18

  },

  libraryTitle: {

    fontSize: 22,

    fontWeight: "700",

    color: "#111"

  },

  librarySubtitle: {

    marginTop: 6,

    color: "#6B7280",

    fontSize: 15,

    lineHeight: 22

  },

  actions: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 28

  },

  playButton: {

    flex: 1,

    height: 54,

    borderRadius: 18,

    backgroundColor: "#FF2D55",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 12

  },

  playText: {

    color: "#FFF",

    fontSize: 17,

    fontWeight: "700",

    marginLeft: 10

  },

  shuffleButton: {

    width: 54,

    height: 54,

    borderRadius: 18,

    backgroundColor: "#FFF",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 10,

    shadowOffset: {

      width: 0,

      height: 4

    },

    elevation: 5

  },

  section: {

    fontSize: 24,

    fontWeight: "700",

    color: "#111827",

    marginBottom: 18

  }

});