import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

interface WaveformProps {
  progress: number; // 0 a 1
  bars?: number;
}

export const Waveform: React.FC<WaveformProps> = ({
  progress,
  bars = 30,
}) => {
  const waveform = useMemo(() => {
    return Array.from({ length: bars }, () =>
      Math.random() * 20 + 5
    );
  }, [bars]);

  return (
    <View style={styles.container}>
      {waveform.map((height, index) => {
        const played = index / bars < progress;

        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height,
                backgroundColor: played ? "#25D366" : "#ccc",
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
});