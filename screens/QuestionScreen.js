import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const colors = ['Red', 'Blue', 'Green', 'Yellow'];

function QuestionScreen({ navigation }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [colors, setColors] = useState(['Red', 'Blue', 'Green', 'Yellow']);

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
      <View style={styles.optionsContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === color && styles.selectedOptionButton,
            ]}
            onPress={() => handleSelectAnswer(color)}
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title="Submit Answer"
        onPress={handleSubmitAnswer}
        disabled={!selectedAnswer}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#AAAAAA',
  },
  optionText: {
    fontSize: 16,
  },
});

export default QuestionScreen;
