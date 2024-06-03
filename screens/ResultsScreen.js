import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { getDatabase, ref, onValue, child, update } from "firebase/database";

function ResultsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [winner, setWinner] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { code, name } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Listen for status changes
    const statusRef = child(gameRef, "status");
    const statusListener = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      if (status === "scoreboard") {
        navigation.navigate("Scoreboard", { code: code, name: name });
      }
    });

    let playersListener;

    const playersRef = child(gameRef, "players");
    const answersRef = child(gameRef, "answers");
    const resultRef = child(gameRef, "results");

    const handleUpdateScores = (correct) => {
      playersListener = onValue(
        playersRef,
        (playersSnapshot) => {
          const players = playersSnapshot.val() || {};

          const updates = {};
          Object.entries(players).forEach(([name, playerData]) => {
            if (correct.includes(name)) {
              const newScore = (playerData.score || 0) + 1;
              updates[`/players/${name}/score`] = newScore;
            }
          });

          // Update the database with new scores
          update(gameRef, updates);
        },
        { onlyOnce: true }
      );
    };

    const answersListener = onValue(
      answersRef,
      (answersSnapshot) => {
        const answers = answersSnapshot.val();
        if (!answers) return;

        let answerCounts = {};
        Object.values(answers).forEach((answer) => {
          if (answerCounts[answer]) {
            answerCounts[answer]++;
          } else {
            answerCounts[answer] = 1;
          }
        });

        // Find winner
        let max = 0;
        let currWinner = "";
        Object.entries(answerCounts).forEach(([person, count]) => {
          if (count > max) {
            max = count;
            currWinner = person;
          }
        });
        setWinner(currWinner);

        // Identify correct answers
        let correct = [];
        Object.entries(answers).forEach(([player, answer]) => {
          if (answer === currWinner) {
            correct.push(player);
          }
        });

        // Update scores
        handleUpdateScores(correct);

        // Convert answer counts to pie chart data format
        const chartData = Object.entries(answerCounts).map(
          ([answer, count]) => ({
            name: answer,
            population: count,
            color: getRandomColor(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          })
        );

        setData(chartData);
        setIsLoading(false);
      },
      { onlyOnce: false }
    ); // Change to false if you want to keep listening

    // Clean up listeners
    return () => {
      playersListener();
      answersListener();
      statusListener();
    };
  }, [code]);

  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);
    const resultRef = child(gameRef, "results");
    onValue(
      gameRef,
      (snapshot) => {
        const currQ = snapshot.val().currentQuestion;
        const round = snapshot.val().currentRound;
        update(resultRef, {[round] : {question: currQ, winner: winner}})
      },
      { onlyOnce: true }
    );
  }, [winner]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleScoreboard = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);
    update(gameRef, { status: "scoreboard" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#9674B4" />
      ) : (
        <>
          <Text style={styles.winner}>Winner: {winner}!</Text>
          <PieChart
            data={data}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <TouchableOpacity style={styles.button} onPress={handleScoreboard}>
            <Text style={styles.buttonText}>Next</Text>
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
  winner: {
    fontSize: 20,
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

export default ResultsScreen;
