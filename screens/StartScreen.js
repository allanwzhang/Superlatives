import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getDatabase, ref, push, set, get } from "firebase/database";

function StartScreen({ navigation }) {
  const [name, setName] = useState("");

  const generateUniqueGameCode = async (db) => {
    const generateCode = () =>
      Math.floor(100000 + Math.random() * 900000).toString();

    const checkCodeExists = async (code) => {
      const gamesRef = ref(db, `games/${code}`);
      const snapshot = await get(gamesRef);
      return snapshot.exists();
    };

    let gameCode = generateCode();
    while (await checkCodeExists(gameCode)) {
      gameCode = generateCode();
    }

    return gameCode;
  };

  const handleCreateGame = async () => {
    if (name !== "") {
      const gameData = {
        players: { [name]: { name: name, score: 0 } }, //Players and scores are combined into one
        currentRound: 1,
        currentQuestion: "What is your favorite color?",
        currentVotes: { [name]: 0 },
        status: "waiting",
      };

      const db = getDatabase();

      // Create a new game in the Firebase Realtime Database with a 6-digit code
      const gameCode = await generateUniqueGameCode(db);
      const gamesRef = ref(db, `games/${gameCode}`);
      set(gamesRef, gameData)
        .then(() => {
          navigation.navigate("Lobby", { name, code: gameCode });
        })
        .catch((error) => {
          console.error("Error creating game: ", error);
        });
    }
  };

  const handleJoinLobby = () => {
    if (name !== "") {
      navigation.navigate("JoinCode", { name });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Your Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#a3a5c3"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleJoinLobby}>
          <Text style={styles.buttonText}>Join Lobby</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#f8f1ff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#9674B4",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  label: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#9674B4",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#a3a5c3",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#9674B4",
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#9674B4",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default StartScreen;
