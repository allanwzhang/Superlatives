import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getDatabase, ref, onValue, child } from 'firebase/database';

function ResultsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [winner, setWinner] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { code } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    const playersRef = child(gameRef, 'players');
    const answersRef = child(gameRef, 'answers');

    const playersListener = onValue(playersRef, (playersSnapshot) => {
      const players = playersSnapshot.val();
      const totalPlayers = players ? Object.keys(players).length : 0;

      const answersListener = onValue(answersRef, (answersSnapshot) => {
        const answers = answersSnapshot.val();
        const totalAnswers = answers ? Object.keys(answers).length : 0;

        if (totalAnswers === totalPlayers && totalPlayers > 0) {
          const answerCounts = {};

          // Count the answers
          Object.values(answers).forEach((playerAnswers) => {
            Object.values(playerAnswers).forEach((answer) => {
              if (answerCounts[answer]) {
                answerCounts[answer]++;
              } else {
                answerCounts[answer] = 1;
              }
            });
          });

          // Convert answer counts to pie chart data format
          const chartData = Object.entries(answerCounts).map(([answer, count]) => ({
            name: answer,
            population: count,
            color: getRandomColor(),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          }));

          setData(chartData);
          setIsLoading(false);
        }
      });

      return () => {
        // Clean up answers listener when players change
        answersListener();
      };
    });

    // Fetch the winner
    const winnerRef = child(gameRef, 'winner');
    const winnerListener = onValue(winnerRef, (snapshot) => {
      const fetchedWinner = snapshot.val();
      setWinner(fetchedWinner);
    });

    // Clean up listeners
    return () => {
      playersListener();
      winnerListener();
    };
  }, [code]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleScoreboard = () => {
    navigation.navigate('Scoreboard', { code });
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
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f1ff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9674B4',
    marginBottom: 20,
  },
  winner: {
    fontSize: 20,
    color: '#9674B4',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9674B4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;
