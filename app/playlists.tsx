import { useMemo } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import Colors from "../constants/Colors";

import SongCard from "../components/SongCard";

import { usePlayer } from "../hooks/usePlayer";
import { useSongs } from "../hooks/useSongs";

export default function PlaylistsScreen() {

  const { songs, recent } = useSongs();

  const {

    play,

    setPlaylist

  } = usePlayer();

  // ===========================
  // PLAYLISTS BASE
  // ===========================

  const playlists = useMemo(() => {

    return [

      {
        id: "recent",
        name: "⏱️ Recientes",
        songs: recent(20)
      },

      {
        id: "all",
        name: "🎧 Todas las canciones",
        songs: songs
      }

    ];

  }, [songs]);

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        📂 Playlists
      </Text>

      <Text style={styles.subtitle}>
        Tu música organizada automáticamente
      </Text>

      <FlatList

        data={playlists}

        keyExtractor={(item) => item.id}

        contentContainerStyle={{ paddingBottom: 120 }}

        renderItem={({ item }) => (

          <View style={styles.playlist}>

            <Text style={styles.playlistTitle}>
              {item.name}
            </Text>

            <Text style={styles.count}>
              {item.songs.length} canciones
            </Text>

            <FlatList

              data={item.songs.slice(0, 5)}

              keyExtractor={(song) => song.id}

              scrollEnabled={false}

              renderItem={({ item: song }) => (

                <TouchableOpacity

                  onPress={async () => {

                    setPlaylist(item.songs);

                    await play(song);

                  }}

                >

                  <SongCard

                    song={song}

                    onPress={() => {}}

                  />

                </TouchableOpacity>

              )}

            />

          </View>

        )}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.background,

    padding: 18

  },

  title: {

    fontSize: 28,

    fontWeight: "bold",

    color: Colors.text

  },

  subtitle: {

    color: Colors.subtitle,

    marginTop: 4,

    marginBottom: 20

  },

  playlist: {

    marginBottom: 25,

    backgroundColor: Colors.card,

    padding: 15,

    borderRadius: 18

  },

  playlistTitle: {

    color: Colors.text,

    fontSize: 18,

    fontWeight: "700"

  },

  count: {

    color: Colors.subtitle,

    marginBottom: 10,

    marginTop: 4

  }

});