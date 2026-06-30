
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

interface Artist {
  id: string;
  name: string;
  songs: number;
}

export default function ArtistsScreen() {

  const { songs } = useSongs();

  const artists: Artist[] = [];

  songs.forEach(() => {

    const artistName = "Artista desconocido";

    const existing = artists.find(
      artist => artist.name === artistName
    );

    if (existing) {

      existing.songs++;

    } else {

      artists.push({

        id: artistName,

        name: artistName,

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
          Artistas
        </Text>

      </View>

      <Text style={styles.subtitle}>
        {artists.length} artista(s)
      </Text>

      <FlatList

        data={artists}

        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 30
        }}

        renderItem={({ item }) => (

          <TouchableOpacity style={styles.card}>

            <View style={styles.avatar}>

              <Ionicons
                name="person"
                size={36}
                color="#34C759"
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text style={styles.artistName}>
                {item.name}
              </Text>

              <Text style={styles.songCount}>
                {item.songs} canción(es)
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#C7C7CC"
            />

          </TouchableOpacity>

        )}

        ListEmptyComponent={

          <View style={styles.empty}>

            <Ionicons
              name="people-outline"
              size={80}
              color="#C7C7CC"
            />

            <Text style={styles.emptyTitle}>
              No hay artistas
            </Text>

            <Text style={styles.emptySubtitle}>
              Los artistas aparecerán cuando tu música tenga esa información.
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

  card: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 16,

    marginBottom: 12,

    elevation: 3,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 3

    }

  },

  avatar: {

    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: "#E8FFF1",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 16

  },

  artistName: {

    fontSize: 18,

    fontWeight: "700",

    color: "#111827"

  },

  songCount: {

    marginTop: 5,

    color: "#6B7280",

    fontSize: 14

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

