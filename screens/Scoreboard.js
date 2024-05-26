import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

function ScoreboardScreen({ navigation }) {
  // Dummy data for the scoreboard
  const data = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 100 },
    { name: 'Charlie', points: 80 },
    { name: 'David', points: 60 },
    { name: 'Eve', points: 40 },
  ];

  // TODO: Rounds such that if round < 5 (can change this) then we go to another question otherwise go to the end screen
  const [round, setRound] = useState(5);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points}</Text>
    </View>
  );

  const handleNext = () => {
    if (round >= 5) navigation.navigate('Winner');
    else navigation.navigate('Question');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoreboard</Text>
      <FlatList
        data={data}
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
