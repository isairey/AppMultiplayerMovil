
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

interface Playlist {
  id: string;
  name: string;
  songs: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function PlaylistsScreen() {

  const playlists: Playlist[] = [

    {
      id: "1",
      name: "Favoritos",
      songs: 0,
      icon: "heart",
      color: "#FF2D55"
    },

    {
      id: "2",
      name: "Reproducidas recientemente",
      songs: 0,
      icon: "time",
      color: "#5856D6"
    },

    {
      id: "3",
      name: "Agregadas recientemente",
      songs: 0,
      icon: "add-circle",
      color: "#34C759"
    },

    {
      id: "4",
      name: "Más reproducidas",
      songs: 0,
      icon: "trending-up",
      color: "#FF9500"
    }

  ];

  return (

    <SafeAreaView style={styles.container}>

      {/* Header */}

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
          Playlists
        </Text>

      </View>

      <Text style={styles.subtitle}>
        Tus listas de reproducción
      </Text>

      <FlatList

        data={playlists}

        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 30
        }}

        renderItem={({ item }) => (

          <TouchableOpacity style={styles.card}>

            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: `${item.color}20`
                }
              ]}
            >

              <Ionicons
                name={item.icon}
                size={34}
                color={item.color}
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text style={styles.playlistName}>
                {item.name}
              </Text>

              <Text style={styles.songCount}>
                {item.songs} canciones
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
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

    marginBottom: 14,

    elevation: 3,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 3

    }

  },

  iconContainer: {

    width: 60,

    height: 60,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 16

  },

  playlistName: {

    fontSize: 18,

    fontWeight: "700",

    color: "#111827"

  },

  songCount: {

    marginTop: 4,

    color: "#6B7280",

    fontSize: 14

  }

});

