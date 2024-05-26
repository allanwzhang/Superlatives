import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function QuestionScreen({ navigation }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    setPlayers([
      { id: '1', name: 'Allan' },
      { id: '2', name: 'Sean' },
      { id: '3', name: 'Rashingkar' },
      { id: '4', name: 'Perla' },
      { id: '5', name: 'Isabella' },
      { id: '6', name: 'Libby' },
    ]);
  }, []);

  const handleSubmitAnswer = () => {
    // TODO: Implement submitting answer logic
    navigation.navigate('Results', { answer: selectedAnswer });
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question</Text>
      <Text style={styles.question}>What is your favorite color?</Text>
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
        style={[styles.submitButton, !selectedAnswer && styles.disabledButton]}
        onPress={handleSubmitAnswer}
        disabled={!selectedAnswer}
      >
        <Text style={styles.submitButtonText}>Submit Answer</Text>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9674B4',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    color: '#9674B4',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gridItem: {
    width: '40%',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5C3E5',
    borderRadius: 5,
  },
  selectedGridItem: {
    backgroundColor: '#9674B4', // Highlighted color for the selected item
  },
  gridItemText: {
    fontSize: 18,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#9674B4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#a3a5c3',
  },
});

export default QuestionScreen;
