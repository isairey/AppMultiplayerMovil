import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header centrado */}
<View style={styles.headerCenter}>
  <Text style={styles.title}>
    Mi Música
  </Text>

  <Text style={styles.subtitle}>
    Biblioteca local
  </Text>
</View>

      {/* Buscar */}

      <Pressable
        style={styles.searchBar}
        onPress={() => router.push("/songs")}
      >
        <Ionicons
          name="search"
          size={20}
          color="#8E8E93"
        />

        <Text style={styles.searchText}>
          Buscar canciones...
        </Text>
      </Pressable>

      {/* Opciones */}

      <View style={styles.grid}>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/songs")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#FFE4EC" }]}>
            <Ionicons
              name="musical-notes"
              size={38}
              color="#FF2D55"
            />
          </View>

          <Text style={styles.cardTitle}>
            Canciones
          </Text>

          <Text style={styles.cardSubtitle}>
            Toda tu música
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => {
  console.log("CLICK ALBUMS");
  router.push("/albums");
}}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#E8E9FF" }]}>
            <Ionicons
              name="albums"
              size={38}
              color="#5856D6"
            />
          </View>

          <Text style={styles.cardTitle}>
            Álbumes
          </Text>

          <Text style={styles.cardSubtitle}>
            Organizados por álbum
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/artists")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#E8FFF1" }]}>
            <Ionicons
              name="people"
              size={38}
              color="#34C759"
            />
          </View>

          <Text style={styles.cardTitle}>
            Artistas
          </Text>

          <Text style={styles.cardSubtitle}>
            Explorar artistas
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/playlists")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#FFF3E5" }]}>
            <Ionicons
              name="list"
              size={38}
              color="#FF9500"
            />
          </View>

          <Text style={styles.cardTitle}>
            Playlists
          </Text>

          <Text style={styles.cardSubtitle}>
            Tus listas de reproducción
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  headerCenter: {
  alignItems: "center",
  marginBottom: 28,
},

title: {
  fontSize: 38,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
},

subtitle: {
  fontSize: 16,
  color: "#6B7280",
  marginTop: 6,
  textAlign: "center",
},

  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 22,
    paddingTop: 60,
  },



  searchBar: {
    height: 54,
    backgroundColor: "#ECECEC",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 30,
  },

  searchText: {
    marginLeft: 10,
    color: "#8E8E93",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 12,
  },

});