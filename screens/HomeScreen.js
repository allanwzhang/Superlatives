import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleStartGame = () => {
    // TODO: Implement joining lobby logic
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Superlatives</Text>
      <Button title="Start Game!" onPress={handleStartGame} />
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;