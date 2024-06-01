import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase, ref, onValue, update, child } from "firebase/database";

function WinnerScreen({ navigation, route }) {
  const [winner, setWinner] = useState("");
  const { code } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Fetch the winner
    const winnerRef = child(gameRef, "winner");
    onValue(winnerRef, (snapshot) => {
      const fetchedWinner = snapshot.val();
      setWinner(fetchedWinner);
    });

    // Clean up listener
    return () => {
      onValue(winnerRef, null);
    };
  }, [code]);

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

  const handleVideo = () => {
    navigation.navigate("Video", { code });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Winner: {winner}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleVideo}>
        <Text style={styles.buttonText}>Watch video</Text>
      </TouchableOpacity>
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
    fontSize: 36,
    fontWeight: "bold",
    color: "#9674B4",
    marginBottom: 20,
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

export default WinnerScreen;
