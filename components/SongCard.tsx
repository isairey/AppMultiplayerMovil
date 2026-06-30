import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { Song } from "../hooks/useSongs";

interface Props {
  song: Song;
  onPress: () => void;
}

export default function SongCard({

  song,

  onPress

}: Props) {

  function formatDuration(seconds: number) {

    if (!seconds) return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

  }

  return (

    <TouchableOpacity

      style={styles.container}

      activeOpacity={0.8}

      onPress={onPress}

    >

      <View style={styles.cover}>

        <Ionicons
          name="musical-note"
          size={28}
          color={Colors.text}
        />

      </View>

      <View style={styles.info}>

        <Text

          numberOfLines={1}

          style={styles.title}

        >

          {song.filename.replace(/\.[^/.]+$/, "")}

        </Text>

        <Text

          numberOfLines={1}

          style={styles.artist}

        >

          Artista desconocido

        </Text>

      </View>

      <View style={styles.right}>

        <Text style={styles.duration}>

          {formatDuration(song.duration)}

        </Text>

        <Ionicons

          name="chevron-forward"

          size={20}

          color={Colors.subtitle}

        />

      </View>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.card,

    padding: 14,

    marginBottom: 12,

    borderRadius: 18

  },

  cover: {

    width: 60,

    height: 60,

    borderRadius: 15,

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

    color: Colors.subtitle,

    marginTop: 5,

    fontSize: 13

  },

  right: {

    alignItems: "center",

    justifyContent: "center"

  },

  duration: {

    color: Colors.subtitle,

    marginBottom: 5,

    fontSize: 12

  }

});