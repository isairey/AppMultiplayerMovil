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
  name: string;
  artist?: string;
  songs: number;
}

interface Props {
  album: Album;
  onPress: () => void;
}

export default function AlbumCard({

  album,

  onPress

}: Props) {

  return (

    <TouchableOpacity

      style={styles.container}

      activeOpacity={0.8}

      onPress={onPress}

    >

      <View style={styles.cover}>

        <Ionicons

          name="disc"

          size={55}

          color={Colors.text}

        />

      </View>

      <Text

        numberOfLines={1}

        style={styles.albumName}

      >

        {album.name}

      </Text>

      <Text

        numberOfLines={1}

        style={styles.artist}

      >

        {album.artist || "Artista desconocido"}

      </Text>

      <Text style={styles.count}>

        {album.songs} canciones

      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container: {

    width: 170,

    backgroundColor: Colors.card,

    borderRadius: 20,

    padding: 15,

    marginRight: 15,

    marginBottom: 15,

    alignItems: "center",

    elevation: 6,

    shadowColor: "#000",

    shadowOpacity: 0.25,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 3

    }

  },

  cover: {

    width: 130,

    height: 130,

    borderRadius: 18,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 15

  },

  albumName: {

    color: Colors.text,

    fontSize: 17,

    fontWeight: "700",

    textAlign: "center"

  },

  artist: {

    color: Colors.subtitle,

    marginTop: 6,

    fontSize: 14,

    textAlign: "center"

  },

  count: {

    marginTop: 10,

    color: Colors.primary,

    fontWeight: "600",

    fontSize: 13

  }

});