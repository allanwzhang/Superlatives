import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, update, child } from 'firebase/database';

function ScoreboardScreen({ navigation, route }) {
  const [scores, setScores] = useState([]);
  const [round, setRound] = useState(0);
  const { code } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    // Fetch scores
    const scoresRef = child(gameRef, 'scores');
    onValue(scoresRef, (snapshot) => {
      const fetchedScores = [];
      snapshot.forEach((childSnapshot) => {
        const playerScore = childSnapshot.val();
        fetchedScores.push(playerScore);
      });
      setScores(fetchedScores);
    });

    // Fetch current round
    const roundRef = child(gameRef, 'currentRound');
    onValue(roundRef, (snapshot) => {
      const fetchedRound = snapshot.val();
      setRound(fetchedRound);
    });

    // Clean up listeners
    return () => {
      onValue(scoresRef, null);
      onValue(roundRef, null);
    };
  }, [code]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points}</Text>
    </View>
  );

  const handleNext = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    if (round >= 5) {
      navigation.navigate('Winner', { code });
    } else {
      // Increment the current round in the database
      update(gameRef, {
        currentRound: round + 1,
      });
      navigation.navigate('Question', { code });
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
        <Text style={styles.buttonText}>{round >= 5 ? 'See results' : 'Next Question'}</Text>
      </TouchableOpacity>
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
    marginTop: 50,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9674B4',
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#a3a5c3',
    width: '100%',
  },
  name: {
    fontSize: 18,
    color: '#9674B4',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9674B4',
  },
  button: {
    backgroundColor: '#9674B4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 20,
  },
});

export default ScoreboardScreen;
