import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  getDatabase,
  ref,
  onValue,
  update,
  child,
} from "firebase/database";

function QuestionScreen({ navigation, route }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { code, name } = route.params;

  useEffect(() => {
    setIsSubmitting(false);
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Fetch players
    const playersRef = child(gameRef, "players");
    const playersListener = onValue(playersRef, (snapshot) => {
      const fetchedPlayers = [];
      snapshot.forEach((childSnapshot) => {
        const player = childSnapshot.val();
        fetchedPlayers.push(player);
      });
      setPlayers(fetchedPlayers);
    });

    // Fetch current question
    const questionRef = child(gameRef, "currentQuestion");
    const questionListener = onValue(questionRef, (snapshot) => {
      const fetchedQuestion = snapshot.val();
      setQuestion(fetchedQuestion);
    });

    // Listen for status changes
    const statusRef = child(gameRef, "status");
    const statusListener = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      if (status === "showResults") {
        navigation.navigate("Results", { code: code, name: name });
      }
    });

    // Clean up listeners
    return () => {
      playersListener();
      questionListener();
      statusListener();
    };
  }, [code, route]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    setIsSubmitting(true);
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Update the player's answer in the database
    const currAnswerRef = child(gameRef, "answers");
    update(currAnswerRef, {
        [name]: selectedAnswer,
      })
      .then(() => {
        // Update the status to show results if all players have submitted answers
        const playersRef = child(gameRef, "players");
        const answersRef = child(gameRef, "answers");
        onValue(
          playersRef,
          (playersSnapshot) => {
            const players = playersSnapshot.val();
            const totalPlayers = players ? Object.keys(players).length : 0;
            onValue(
              answersRef,
              (answersSnapshot) => {
                const answers = answersSnapshot.val();
                const totalAnswers = answers ? Object.keys(answers).length : 0;
                if (totalAnswers === totalPlayers && totalPlayers > 0) {
                  update(gameRef, { status: "showResults" });
                }
              },
              { onlyOnce: true }
            );
          },
          { onlyOnce: true }
        );
      });
  };

  return (
    <View style={styles.container}>
      {isSubmitting ? (
        <ActivityIndicator size="large" color="#9674B4" />
      ) : (
        <>
          <Text style={styles.title}>Question</Text>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.grid}>
            {players.map((player, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.gridItem,
                  selectedAnswer === player.name && styles.selectedGridItem,
                ]}
                onPress={() => handleSelectAnswer(player.name)}
              >
                <Text style={styles.gridItemText}>{player.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton,
              !selectedAnswer && styles.disabledButton,
            ]}
            onPress={handleSubmitAnswer}
            disabled={!selectedAnswer}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        </>
      )}
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
  question: {
    fontSize: 20,
    color: "#9674B4",
    marginBottom: 20,
    textAlign: "center",
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
    backgroundColor: "#D5C3E5",
    borderRadius: 5,
  },
  selectedGridItem: {
    backgroundColor: "#9674B4", // Highlighted color for the selected item
  },
  gridItemText: {
    fontSize: 18,
    color: "white",
  },
  submitButton: {
    backgroundColor: "#9674B4",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#a3a5c3",
  },
});

export default QuestionScreen;
