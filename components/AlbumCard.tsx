import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export interface Album {
  id: string;
  title: string;
  artist?: string;
  songs: number;
}

interface Props {
  album: Album;
  onPress?: () => void;
}

export default function AlbumCard({
  album,
  onPress,
}: Props) {

  return (

    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >

      <View style={styles.cover}>

        <Ionicons
          name="albums"
          size={55}
          color="#fff"
        />

      </View>

      <Text
        numberOfLines={1}
        style={styles.albumName}
      >
        {album.title}
      </Text>

      <Text
        numberOfLines={1}
        style={styles.artist}
      >
        {album.artist ?? "Artista desconocido"}
      </Text>

      <Text style={styles.count}>
        {album.songs} canciones
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  cover: {
    width: "100%",
    height: 170,
    borderRadius: 18,
    backgroundColor: "#5856D6",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,
  },

  albumName: {
    color: "#111827",
    fontSize: 19,
    fontWeight: "700",
  },

  artist: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 15,
  },

  count: {
    marginTop: 10,
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },

});