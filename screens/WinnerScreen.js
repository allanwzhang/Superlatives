import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function WinnerScreen({ navigation }) {
  const [name, setName] = useState('Rob');

  const handleRestart = () => {
    navigation.navigate('Lobby');
  };
  
  const handleVideo = () => {
    navigation.navigate('Video');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Winner: {name}</Text>
      <Button title="Watch video" onPress={handleVideo} />
      <Button title="Play again" onPress={handleRestart} />
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
});

export default WinnerScreen;