import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { getQuestion } from "../functions/getQuestion";

function LobbyScreen({ navigation, route }) {
  const { code, name } = route.params;
  const [players, setPlayers] = useState([]);
  const [creator, setCreator] = useState("");
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    const db = getDatabase();
    // Reference to the game's data in the database
    const gameRef = ref(db, `games/${route.params.code}`);

    // Listen for changes in the game's data
    const gameListener = onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      if (gameData) {
        if (gameData.players && Object.keys(gameData.players).length !== 0) {
          setPlayers(Object.values(gameData.players));
          setCreator(Object.values(gameData.players)[0].name);
          setStatus(gameData.status);

          // If the game has started, navigate to the Question screen
          if (gameData.status === "started") {
            navigation.navigate("Question", {
              code: code,
              name: name,
            });
          }
        } else {
          console.log("no players");
        }
      }
    });
    return () => {
      gameListener();
    };
  }, [route.params]);

  const handleStartGame = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    getQuestion(code)
    update(gameRef, {
      status: "started",
    })
  };

  const handleLeaveLobby = () => {
    const db = getDatabase();
    const playerRef = ref(db, `games/${code}/players/${name}`);
    const votesRef = ref(db, `games/${code}/currentVotes/${name}`);
    remove(playerRef)
      .then(() => {
        remove(votesRef)
          .then(() => {
            navigation.navigate("Start");
          })
          .catch((error) => {
            console.log("Error leaving the lobby:", error);
          });
      })
      .catch((error) => {
        console.log("Error leaving the lobby:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lobby</Text>
      <Text style={styles.code}>Code: {code}</Text>
      <View style={styles.grid}>
        {players.map((player, index) => (
          <View
            key={index}
            style={[styles.gridItem, index === 0 && styles.firstGridItem]}
          >
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLeaveLobby}>
          <Text style={styles.buttonText}>Leave</Text>
        </TouchableOpacity>
        {name === creator && (
          <TouchableOpacity style={styles.button} onPress={handleStartGame}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f1ff",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#9674B4",
    marginBottom: 20,
  },
  code: {
    fontSize: 20,
    color: "#9674B4",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    color: "#9674B4",
    marginBottom: 20,
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  gridItem: {
    width: "40%",
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a3a5c3",
    borderRadius: 5,
  },
  firstGridItem: {
    backgroundColor: "#9674B4", // Lighter color for the first item
  },
  playerName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#9674B4",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LobbyScreen;
