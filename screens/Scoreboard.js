import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

function ScoreboardScreen({ navigation }) {
  // Dummy data for the scoreboard
  const data = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 100 },
    { name: 'Charlie', points: 80 },
    { name: 'David', points: 60 },
    { name: 'Eve', points: 40 },
  ];

  //TODO: Rounds such that if round < 5 (can change this) then we go to another question otherwise go to the end screen
  const [round, setRound] = useState(5);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points}</Text>
    </View>
  );

  const handleNext = () => {
    if(round >= 5) navigation.navigate("Winner");
    else navigation.navigate("Question");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoreboard</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.buttonContainer}>
        <Button title={round >= 5 ? "See results" : "Next Question"} onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  name: {
    fontSize: 18,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 100
  }
});

export default ScoreboardScreen;
