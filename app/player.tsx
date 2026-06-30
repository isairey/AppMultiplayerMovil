import { useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Slider from "@react-native-community/slider";
import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import PlayerControls from "../components/PlayerControls";
import Colors from "../constants/Colors";
import { usePlayer } from "../hooks/usePlayer";

export default function PlayerScreen() {

  const {

    currentSong,

    isPlaying,

    position,

    duration,

    pause,

    resume,

    seekTo,

    next,

    previous,

    shuffle,

    repeat,

    toggleShuffle,

    toggleRepeat,

    updateProgress

  } = usePlayer();

  // Actualizar barra de progreso
  useEffect(() => {

    const interval = setInterval(() => {

      updateProgress();

    }, 500);

    return () => clearInterval(interval);

  }, []);

  function formatTime(ms: number) {

    if (!ms) return "0:00";

    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  }

  if (!currentSong) {

    return (

      <View style={styles.loading}>

        <Text style={{ color: "#fff", fontSize: 18 }}>
          No hay ninguna canción reproduciéndose
        </Text>

      </View>

    );

  }

  return (

    <SafeAreaView style={styles.container}>

      <TouchableOpacity

        style={styles.back}

        onPress={() => router.back()}

      >

        <Ionicons

          name="chevron-down"

          size={30}

          color="#fff"

        />

      </TouchableOpacity>

      <View style={styles.coverContainer}>

        <View style={styles.cover}>

          <Ionicons

            name="musical-notes"

            size={100}

            color="#fff"

          />

        </View>

      </View>

      <Text

        numberOfLines={1}

        style={styles.title}

      >

        {currentSong.filename.replace(/\.[^/.]+$/, "")}

      </Text>

      <Text style={styles.artist}>

        Artista desconocido

      </Text>

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

          maximumTrackTintColor="#555"

          thumbTintColor={Colors.primary}

          onSlidingComplete={(value) => seekTo(value)}

        />

        <Text style={styles.time}>

          {formatTime(duration)}

        </Text>

      </View>

      <PlayerControls

        isPlaying={isPlaying}

        shuffle={shuffle}

        repeat={repeat}

        onPlayPause={() => {

          if (isPlaying) {

            pause();

          } else {

            resume();

          }

        }}

        onNext={next}

        onPrevious={previous}

        onShuffle={toggleShuffle}

        onRepeat={toggleRepeat}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  loading: {

    flex: 1,

    backgroundColor: Colors.background,

    justifyContent: "center",

    alignItems: "center"

  },

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

    marginTop: 40,

    marginBottom: 35

  },

  cover: {

    width: 270,

    height: 270,

    borderRadius: 25,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center"

  },

  title: {

    color: "#fff",

    fontSize: 24,

    fontWeight: "bold",

    textAlign: "center"

  },

  artist: {

    color: Colors.subtitle,

    textAlign: "center",

    marginTop: 8,

    marginBottom: 30,

    fontSize: 16

  },

  sliderContainer: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 30

  },

  time: {

    color: Colors.subtitle,

    width: 45,

    textAlign: "center"

  }

});