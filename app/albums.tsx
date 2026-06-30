```tsx
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AlbumCard from "../components/AlbumCard";
import { useSongs } from "../hooks/useSongs";

interface Album {
  id: string;
  title: string;
  songs: number;
}

export default function AlbumsScreen() {

  const { songs } = useSongs();

  // Agrupar canciones por nombre de álbum (temporal)
  const albums: Album[] = [];

  songs.forEach((song) => {

    const albumName = "Álbum desconocido";

    const existing = albums.find(a => a.title === albumName);

    if (existing) {

      existing.songs++;

    } else {

      albums.push({

        id: albumName,

        title: albumName,

        songs: 1

      });

    }

  });

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >

          <Ionicons
            name="chevron-back"
            size={26}
            color="#111"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          Álbumes
        </Text>

      </View>

      <Text style={styles.subtitle}>
        {albums.length} álbum(es)
      </Text>

      <FlatList

        data={albums}

        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 30
        }}

        renderItem={({ item }) => (

          <AlbumCard
            album={item}
          />

        )}

        ListEmptyComponent={

          <View style={styles.empty}>

            <Ionicons
              name="albums-outline"
              size={80}
              color="#C7C7CC"
            />

            <Text style={styles.emptyTitle}>
              No hay álbumes
            </Text>

            <Text style={styles.emptySubtitle}>
              Los álbumes aparecerán cuando tu música tenga esta información.
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

    justifyContent: "center",

    alignItems: "center",

    marginTop: 120

  },

  emptyTitle: {

    marginTop: 18,

    fontSize: 22,

    fontWeight: "700",

    color: "#111827"

  },

  emptySubtitle: {

    marginTop: 10,

    textAlign: "center",

    color: "#6B7280",

    fontSize: 15,

    lineHeight: 22,

    paddingHorizontal: 30

  }

});
```
