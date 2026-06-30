import { useMemo } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native";

import AlbumCard, { Album } from "../components/AlbumCard";
import Colors from "../constants/Colors";

import { useSongs } from "../hooks/useSongs";

export default function AlbumsScreen() {

  const { songs } = useSongs();

  // ===========================
  // AGRUPAR COMO ALBUMS
  // ===========================

  const albums: Album[] = useMemo(() => {

    const map: Record<string, Album> = {};

    songs.forEach(song => {

      // Simulación de álbum (porque MediaLibrary no siempre trae album)
      const rawName = song.filename;

      const base = rawName.split("-")[0]?.trim() || "Unknown Album";

      if (!map[base]) {

        map[base] = {

          id: base,

          name: base,

          artist: "Artista desconocido",

          songs: 0

        };

      }

      map[base].songs += 1;

    });

    return Object.values(map);

  }, [songs]);

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        💿 Álbumes
      </Text>

      <Text style={styles.subtitle}>
        Tu música organizada
      </Text>

      <FlatList

        data={albums}

        keyExtractor={(item) => item.id}

        numColumns={2}

        contentContainerStyle={styles.list}

        renderItem={({ item }) => (

          <AlbumCard

            album={item}

            onPress={() => {

              console.log("Abrir álbum:", item.name);

            }}

          />

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

  }

});