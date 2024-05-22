import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function QuestionScreen({ navigation }) {
  const [answer, setAnswer] = useState('');

  const handleSubmitAnswer = () => {
    // TODO: Implement submitting answer logic
    navigation.navigate('Results');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question</Text>
      <Text style={styles.question}>What is your favorite color?</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <Button title="Submit Answer" onPress={handleSubmitAnswer} />
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
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default QuestionScreen;