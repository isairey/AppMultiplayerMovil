import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text
} from "react-native";

import { router } from "expo-router";

import MiniPlayer from "../components/MiniPlayer";
import SongCard from "../components/SongCard";

import { useSongs } from "../hooks/useSongs";

import Colors from "../constants/Colors";

export default function Home() {

  const { songs } = useSongs();

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        🎧 Music Player
      </Text>

      <Text style={styles.subtitle}>
        Toda tu música
      </Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <SongCard
            song={item}
            onPress={() =>
              router.push({
                pathname: "/player",
                params: {
                  id: item.id
                }
              })
            }
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
    backgroundColor: Colors.background,
    paddingHorizontal: 18,
    paddingTop: 50
  },

  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "bold"
  },

  subtitle: {
    color: Colors.subtitle,
    marginBottom: 25,
    marginTop: 5,
    fontSize: 16
  }

});