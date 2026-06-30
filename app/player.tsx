import { useEffect } from "react";
import {
    SafeAreaView,

    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";



import Slider from "@react-native-community/slider";
import { router, useLocalSearchParams } from "expo-router";

import {
    Ionicons
} from "@expo/vector-icons";

import Colors from "../constants/Colors";

import PlayerControls from "../components/PlayerControls";

import { usePlayer } from "../hooks/usePlayer";
import { useSongs } from "../hooks/useSongs";

export default function PlayerScreen() {

  const { id } = useLocalSearchParams();

  const {

    songs

  } = useSongs();

  const {

    currentSong,

    isPlaying,

    position,

    duration,

    play,

    pause,

    resume,

    seekTo,

    next,

    previous,

    shuffle,

    repeat,

    toggleShuffle,

    toggleRepeat

  } = usePlayer();

  // ===========================
  // CARGAR CANCION
  // ===========================

  useEffect(() => {

    if (!songs.length || !id) return;

    const index = songs.findIndex(s => s.id === id);

    if (index !== -1) {

      play(songs[index], index);

    }

  }, [songs, id]);

  // ===========================
  // FORMATO TIEMPO
  // ===========================

  function formatTime(ms: number) {

    if (!ms) return "0:00";

    const sec = Math.floor(ms / 1000);

    const min = Math.floor(sec / 60);

    const rest = sec % 60;

    return `${min}:${rest < 10 ? "0" : ""}${rest}`;

  }

  if (!currentSong) {

    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>
          Cargando...
        </Text>
      </View>
    );

  }

  return (

    <SafeAreaView style={styles.container}>

      {/* BACK */}

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.back}
      >
        <Ionicons
          name="chevron-down"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      {/* COVER */}

      <View style={styles.coverContainer}>

        <View style={styles.cover}>

          <Ionicons
            name="musical-notes"
            size={100}
            color={Colors.text}
          />

        </View>

      </View>

      {/* INFO */}

      <Text style={styles.title} numberOfLines={1}>
        {currentSong.filename?.replace(/\.[^/.]+$/, "")}
      </Text>

      <Text style={styles.artist}>
        Artista desconocido
      </Text>

      {/* SLIDER */}

      <View style={styles.sliderContainer}>

        <Text style={styles.time}>
          {formatTime(position)}
        </Text>

        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor="#444"
          onSlidingComplete={seekTo}
        />

        <Text style={styles.time}>
          {formatTime(duration)}
        </Text>

      </View>

      {/* CONTROLES */}

      <PlayerControls

        isPlaying={isPlaying}

        shuffle={shuffle}

        repeat={repeat}

        onPlayPause={isPlaying ? pause : resume}

        onNext={next}

        onPrevious={previous}

        onShuffle={toggleShuffle}

        onRepeat={toggleRepeat}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.background,

    padding: 20

  },

  back: {

    marginTop: 10

  },

  coverContainer: {

    alignItems: "center",

    justifyContent: "center",

    marginTop: 40,

    marginBottom: 30

  },

  cover: {

    width: 260,

    height: 260,

    borderRadius: 25,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center"

  },

  title: {

    color: "#fff",

    fontSize: 22,

    fontWeight: "bold",

    textAlign: "center"

  },

  artist: {

    color: Colors.subtitle,

    textAlign: "center",

    marginTop: 5,

    marginBottom: 20

  },

  sliderContainer: {

    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginVertical: 20

  },

  time: {

    color: Colors.subtitle,

    fontSize: 12

  }

});