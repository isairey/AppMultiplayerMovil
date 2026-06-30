import {
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";

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

      <TouchableOpacity
        style={styles.smallButton}
        onPress={onShuffle}
      >
        <Ionicons
          name="shuffle"
          size={26}
          color={
            shuffle
              ? Colors.primary
              : Colors.subtitle
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallButton}
        onPress={onPrevious}
      >
        <Ionicons
          name="play-skip-back"
          size={34}
          color={Colors.text}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.playButton}
        onPress={onPlayPause}
      >
        <MaterialIcons
          name={
            isPlaying
              ? "pause"
              : "play-arrow"
          }
          size={42}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallButton}
        onPress={onNext}
      >
        <Ionicons
          name="play-skip-forward"
          size={34}
          color={Colors.text}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallButton}
        onPress={onRepeat}
      >
        <Ionicons
          name="repeat"
          size={26}
          color={
            repeat
              ? Colors.primary
              : Colors.subtitle
          }
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

    alignItems: "center"

  },

  playButton: {

    width: 80,

    height: 80,

    borderRadius: 40,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.primary,

    elevation: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5
    },

    shadowOpacity: 0.3,

    shadowRadius: 6

  }

});