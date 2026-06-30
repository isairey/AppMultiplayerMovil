import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function AlbumCard({ album, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>

      <View style={styles.cover}>
        <Ionicons name="albums" size={40} color="#fff" />
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {album.title}
      </Text>

      <Text numberOfLines={1} style={styles.subtitle}>
        {album.songs} canciones
      </Text>

      {album.artist && (
        <Text numberOfLines={1} style={styles.artist}>
          {album.artist}
        </Text>
      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  cover: {
    height: 120,
    borderRadius: 16,
    backgroundColor: "#5856D6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#8E8E93",
  },

  artist: {
    marginTop: 2,
    fontSize: 12,
    color: "#A1A1A6",
  },
});