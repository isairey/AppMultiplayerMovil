import { useMemo } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";

import Colors from "../constants/Colors";
import { useSongs } from "../hooks/useSongs";

interface Artist {
  id: string;
  name: string;
  songs: number;
}

export default function ArtistsScreen() {

  const { songs } = useSongs();

  // ===========================
  // AGRUPAR ARTISTAS
  // ===========================

  const artists: Artist[] = useMemo(() => {

    const map: Record<string, Artist> = {};

    songs.forEach(song => {

      // Simulación de artista
      // (MediaLibrary normalmente no lo provee)
      const raw = song.filename;

      let artistName = "Artista desconocido";

      // Intento de extracción tipo "Artista - Canción"
      if (raw.includes("-")) {

        artistName = raw.split("-")[0].trim();

      }

      if (!map[artistName]) {

        map[artistName] = {

          id: artistName,

          name: artistName,

          songs: 0

        };

      }

      map[artistName].songs += 1;

    });

    return Object.values(map);

  }, [songs]);

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        🎤 Artistas
      </Text>

      <Text style={styles.subtitle}>
        Tu música por intérprete
      </Text>

      <FlatList

        data={artists}

        keyExtractor={(item) => item.id}

        contentContainerStyle={styles.list}

        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.avatar} />

            <View style={{ flex: 1 }}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.count}>
                {item.songs} canciones
              </Text>

            </View>

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

  list: {

    paddingBottom: 100

  },

  card: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.card,

    padding: 14,

    borderRadius: 16,

    marginBottom: 12

  },

  avatar: {

    width: 50,

    height: 50,

    borderRadius: 25,

    backgroundColor: Colors.primary,

    marginRight: 12

  },

  name: {

    color: Colors.text,

    fontSize: 16,

    fontWeight: "700"

  },

  count: {

    color: Colors.subtitle,

    marginTop: 4,

    fontSize: 13

  }

});