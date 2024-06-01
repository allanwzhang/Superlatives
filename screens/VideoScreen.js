import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase, ref, update } from "firebase/database";

function VideoScreen({ navigation, route }) {
  const { code } = route.params;

  const handleRestart = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Reset the game data in the Firebase Realtime Database
    update(gameRef, {
      currentRound: 1,
      currentQuestion: "What is your favorite color?",
      answers: {},
      winner: "",
    });

    navigation.navigate("Lobby", { code });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Video Screen, will show play again button after video is done
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRestart}>
        <Text style={styles.buttonText}>Play again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f1ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9674B4",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9674B4",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VideoScreen;
