import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase, ref, update, child, onValue } from "firebase/database";
import { getQuestion } from "../functions/getQuestion";

function VideoScreen({ navigation, route }) {
  const { code, name } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Listen for status changes
    const statusRef = child(gameRef, "status");
    const statusListener = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      if (status == "waiting") {
        navigation.navigate("Lobby", { code: code, name: name });
      }
    });

     // Clean up listeners
     return () => {
      statusListener();
    };
  }, [route])

  const handleRestart = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Reset the game data in the Firebase Realtime Database
    const playersRef = child(gameRef, "players");
    onValue(
      playersRef,
      (snapshot) => {
        const players = snapshot.val();

        if (players) {
          const updates = {};
          Object.keys(players).forEach((playerName) => {
            updates[`/players/${playerName}/score`] = 0;
          });
          // Update all scores to 0
          update(gameRef, updates);
        }
      },
      { onlyOnce: true }
    );
    getQuestion(code)
    update(gameRef, {
      currentRound: 1,
      answers: {},
      results: {},
      status: "waiting",
    });
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
