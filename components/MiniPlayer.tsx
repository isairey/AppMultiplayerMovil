import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { usePlayer } from "../hooks/usePlayer";

export default function MiniPlayer() {

  const {

    currentSong,

    isPlaying,

    pause,

    resume

  } = usePlayer();

  if (!currentSong) return null;

  async function togglePlay() {

    if (isPlaying) {

      await pause();

    } else {

      await resume();

    }

  }

  return (

    <TouchableOpacity

      activeOpacity={0.9}

      style={styles.container}

      onPress={() => router.push("/player")}

    >

      <View style={styles.cover}>

        <Ionicons

          name="musical-notes"

          size={30}

          color={Colors.text}

        />

      </View>

      <View style={styles.info}>

        <Text

          numberOfLines={1}

          style={styles.title}

        >

          {currentSong.filename}

        </Text>

        <Text

          numberOfLines={1}

          style={styles.artist}

        >

          Artista desconocido

        </Text>

      </View>

      <TouchableOpacity

        onPress={togglePlay}

        style={styles.playButton}

      >

        <Ionicons

          name={

            isPlaying

              ? "pause"

              : "play"

          }

          size={28}

          color={Colors.text}

        />

      </TouchableOpacity>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container: {

    position: "absolute",

    bottom: 15,

    left: 15,

    right: 15,

    backgroundColor: Colors.card,

    borderRadius: 18,

    padding: 12,

    flexDirection: "row",

    alignItems: "center",

    elevation: 10,

    shadowColor: "#000",

    shadowOpacity: 0.35,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 4

    }

  },

  cover: {

    width: 55,

    height: 55,

    borderRadius: 12,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center"

  },

  info: {

    flex: 1,

    marginLeft: 15

  },

  title: {

    color: Colors.text,

    fontSize: 16,

    fontWeight: "700"

  },

  artist: {

    marginTop: 4,

    color: Colors.subtitle,

    fontSize: 13

  },

  playButton: {

    width: 50,

    height: 50,

    borderRadius: 25,

    justifyContent: "center",

    alignItems: "center"

  }

});