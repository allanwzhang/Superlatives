import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  getDatabase,
  ref,
  onValue,
  update,
  child,
  remove,
} from "firebase/database";
import { getQuestion } from "../functions/getQuestion";

function ScoreboardScreen({ navigation, route }) {
  const [scores, setScores] = useState([]);
  const [round, setRound] = useState(0);
  const { code, name } = route.params;

  //Fetch scores
  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Listen for status changes
    const statusRef = child(gameRef, "status");
    const statusListener = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      if (status == "end") {
        navigation.navigate("Winner", { code: code, name: name });
      }
      if (status == "question") {
        navigation.navigate("Question", { code: code, name: name });
      }
    });

    const playersRef = child(gameRef, "players");
    onValue(
      playersRef,
      (playersSnapshot) => {
        const players = playersSnapshot.val() || {};

        let newScores = [];
        Object.entries(players).forEach(([name, playerData]) => {
          newScores.push(playerData);
        });
        newScores.sort((a, b) => b.score - a.score);
        setScores(newScores);
      },
      { onlyOnce: true }
    );

    // Fetch current round
    const roundRef = child(gameRef, "currentRound");
    onValue(
      roundRef,
      (snapshot) => {
        const fetchedRound = snapshot.val();
        setRound(fetchedRound);
      },
      { onlyOnce: true }
    );

    // Clean up listeners
    return () => {
      statusListener();
    };
  }, [code]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.score}</Text>
    </View>
  );

  const handleNext = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    if (round >= 5) {
      update(gameRef, {
        status: "end",
      });
    } else {
      // Increment the current round in the database
      // Delete all answers, increment round, pick new question, update status
      update(gameRef, {
        currentRound: round + 1,
      });
      update(gameRef, {
        currentQuestion: "What's your favorite food?",
      });
      getQuestion(code)
      update(gameRef, {
        status: "question",
      });
      answersRef = child(gameRef, "answers");
      remove(answersRef);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoreboard</Text>
      <FlatList
        data={scores}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.list}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {round >= 5 ? "See results" : "Next Question"}
        </Text>
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
    marginTop: 50,
    fontSize: 36,
    fontWeight: "bold",
    color: "#9674B4",
    marginBottom: 20,
  },
  list: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#a3a5c3",
    width: "100%",
  },
  name: {
    fontSize: 18,
    color: "#9674B4",
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9674B4",
  },
  button: {
    backgroundColor: "#9674B4",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ScoreboardScreen;
