import {
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";


interface Props {
  isPlaying: boolean;
  shuffle: boolean;
  repeat: boolean;

  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
}

export default function PlayerControls({
  isPlaying,
  shuffle,
  repeat,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat
}: Props) {

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.smallButton} onPress={onShuffle}>
        <Ionicons
          name="shuffle"
          size={24}
          color={shuffle ? "#1C1C1E" : "#8E8E93"}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.smallButton} onPress={onPrevious}>
        <Ionicons
          name="play-skip-back"
          size={32}
          color="#8E8E93"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={44}
          color="#1C1C1E"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.smallButton} onPress={onNext}>
        <Ionicons
          name="play-skip-forward"
          size={32}
          color="#8E8E93"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.smallButton} onPress={onRepeat}>
        <Ionicons
          name="repeat"
          size={24}
          color={repeat ? "#1C1C1E" : "#8E8E93"}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15
  },

  smallButton: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },

  playButton: {
    width: 78,
    height: 78,
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4
  }

});