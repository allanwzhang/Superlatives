import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getDatabase, ref, onValue, update } from "firebase/database";

function JoinCodeScreen({ navigation, route }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (route.params && route.params.name) {
      setName(route.params.name);
    }
  }, [route.params]);

  //Updated to catch duplicate names
  const handleJoinLobby = () => {
    setIsLoading(true);
    setError(null);

    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    onValue(
      gameRef,
      (snapshot) => {
        if (snapshot.exists()) {
          // Game exists, add or update player in the players list
          const gameData = snapshot.val();
          const playersRef = ref(db, `games/${code}/players`);
          const currentVotesRef = ref(db, `games/${code}/currentVotes`);

          const players = gameData.players ? { ...gameData.players } : {};
          const currentVotes = gameData.currentVotes
            ? { ...gameData.currentVotes }
            : {};

          if (players[name]) {
            // Player name already exists, throw an error
            setIsLoading(false);
            setError("Player name already exists in the game.");
          } else {
            // Add player if not already in the list
            players[name] = { name: name, score: 0 };
            currentVotes[name] = 0; // Initialize votes for new player

            update(playersRef, players)
              .then(() => {
                update(currentVotesRef, currentVotes)
                  .then(() => {
                    setIsLoading(false);
                    // Navigate to the lobby screen
                    navigation.navigate("Lobby", { name: name, code: code });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    setError("Error updating votes: " + error.message);
                  });
              })
              .catch((error) => {
                setIsLoading(false);
                setError("Error joining the game: " + error.message);
              });
          }
        } else {
          // Game does not exist, show an error message
          setIsLoading(false);
          setError("Invalid game code");
        }
      },
      { onlyOnce: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Game</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Game Code"
          placeholderTextColor="#a3a5c3"
          value={code}
          onChangeText={setCode}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleJoinLobby}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Enter Game</Text>
        )}
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#9674B4",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default JoinCodeScreen;
