import { Audio, AVPlaybackStatus } from "expo-av";
import { useEffect, useRef, useState } from "react";

export const useAudioPlayerHook = (uri: string | null) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!uri) return;

    let isMounted = true;

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        {
          shouldPlay: false,
          isLooping: false,
        }
      );

      soundRef.current = sound;

      const status = await sound.getStatusAsync();

      if (status.isLoaded && isMounted) {
        setDuration(status.durationMillis ?? 0);
      }

      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (!status.isLoaded) return;

        setPosition(status.positionMillis ?? 0);
        setIsPlaying(status.isPlaying);

        if (status.didJustFinish) {
          
          sound.stopAsync();
          sound.setPositionAsync(0);

          setPosition(0);
          setIsPlaying(false);
        }
      });
    };

    loadSound();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [uri]);

  const play = async () => {
    if (!soundRef.current) return;
    await soundRef.current.playAsync();
  };

  const pause = async () => {
    if (!soundRef.current) return;
    await soundRef.current.pauseAsync();
  };

  return {
    play,
    pause,
    duration,
    position,
    isPlaying,
  };
};