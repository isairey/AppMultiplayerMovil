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
        <Text style={styles.loadingText}>
          No hay ninguna canción reproduciéndose
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-down" size={26} color="#1C1C1E" />
      </TouchableOpacity>

      <View style={styles.coverContainer}>
        <View style={styles.cover}>
          <Ionicons name="musical-notes" size={80} color="#1C1C1E" />
        </View>
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {currentSong.filename.replace(/\.[^/.]+$/, "")}
      </Text>

      <Text style={styles.artist}>
        Artista desconocido
      </Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.time}>{formatTime(position)}</Text>

        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#1C1C1E"
          maximumTrackTintColor="#D1D1D6"
          thumbTintColor="#1C1C1E"
          onSlidingComplete={(value) => seekTo(value)}
        />

        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>

      <PlayerControls
        isPlaying={isPlaying}
        shuffle={shuffle}
        repeat={repeat}
        onPlayPause={() => {
          if (isPlaying) pause();
          else resume();
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
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  loadingText: {
    color: "#1C1C1E",
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center"
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    padding: 20
  },

  back: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },

  coverContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30
  },

  cover: {
    width: 260,
    height: 260,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3
  },

  title: {
    color: "#1C1C1E",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10
  },

  artist: {
    color: "#8E8E93",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 25,
    fontSize: 14
  },

  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25
  },

  time: {
    color: "#8E8E93",
    width: 45,
    textAlign: "center",
    fontSize: 12
  }

});