import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Ionicons } from "@expo/vector-icons";

interface AudioMessageProps {
  audioUri: string;
  duration: number;
}

const AudioMessage: React.FC<AudioMessageProps> = ({ audioUri, duration }) => {
  const player = useAudioPlayer(audioUri);
  const status = useAudioPlayerStatus(player);

  // ✅ Cuando termina: volver al inicio y quedar pausado
  useEffect(() => {
    if (status.didJustFinish) {
      player.pause(); // asegurar que queda pausado
      player.seekTo(0); // volver al inicio
    }
  }, [status.didJustFinish]);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const formatTime = (timeMs: number) => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const totalDuration =
    status.duration && status.duration > 0 ? status.duration : duration * 1000;

  const progress =
    totalDuration > 0 ? (status.currentTime / totalDuration) * 100 : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
        <Ionicons
          name={player.playing ? "pause" : "play"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.timeText}>
        {formatTime(status.currentTime)} / {formatTime(totalDuration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 5,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  timeText: {
    fontSize: 12,
    color: "#555",
  },
});

export default AudioMessage;
