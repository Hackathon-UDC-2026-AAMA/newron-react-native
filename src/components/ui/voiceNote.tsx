import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MaterialIcons from "@react-native-vector-icons/material-design-icons";
import { useAudioPlayerHook } from "../voiceRecord/useAudioPlayerHook";
import { Waveform } from "./Waveform";

interface VoiceNoteProps {
    audioUri: string;
    time?: string;
    isSender?: boolean;
    read?: boolean;
}

const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const VoiceNote: React.FC<VoiceNoteProps> = ({
    audioUri,
    time = "10:30",
    isSender = true,
    read = true,
}) => {
    const { play, pause, duration, position, isPlaying } =
        useAudioPlayerHook(audioUri);

    const progress =
        duration > 0 ? position / duration : 0;

    return (
        <View
            style={[
                styles.wrapper,
                isSender ? styles.alignRight : styles.alignLeft,
            ]}
        >
            <View
                style={[
                    styles.bubble,
                    isSender ? styles.senderBubble : styles.receiverBubble,
                ]}
            >
                <View style={styles.audioRow}>
                    <Pressable
                        style={styles.playButton}
                        onPress={isPlaying ? pause : play}
                    >
                        //Cambiar los iconos
                        <MaterialIcons
                            name={isPlaying ? "pause" : "play-arrow"}
                            size={22}
                            color="#fff"
                        />
                    </Pressable>

                    <View style={styles.waveContainer}>
                        <Waveform progress={progress} />
                    </View>

                    
                </View>

                <View style={styles.footer}>
                    <Text style={styles.duration}>
                        {formatDuration(isPlaying ? position : duration)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        paddingHorizontal: 12,
        marginVertical: 6,
    },
    alignRight: {
        alignItems: "flex-end",
    },
    alignLeft: {
        alignItems: "flex-start",
    },
    bubble: {
        maxWidth: "85%",
        minWidth: 220,
        padding: 12,
        borderRadius: 18,
        elevation: 1,
    },
    senderBubble: {
        backgroundColor: "#DCF8C6",
        borderTopRightRadius: 4,
    },
    receiverBubble: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 4,
    },
    audioRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%", 
        justifyContent: "space-between"
    },
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#25D366",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    waveContainer: {
        flex: 1,
        height: 40,
        justifyContent: "center",
    },
    waveBackground: {
        height: 4,
        backgroundColor: "#ccc",
        borderRadius: 2,
    },
    waveProgress: {
        position: "absolute",
        height: 4,
        backgroundColor: "#25D366",
        borderRadius: 2,
    },
    duration: {
        fontSize: 12,
        marginLeft: 10,
        color: "#555",
        minWidth: 40
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 6,
    },
    time: {
        fontSize: 11,
        color: "#666",
        marginRight: 4,
    },
});