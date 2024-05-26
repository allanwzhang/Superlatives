import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
      <Text style={styles.title}>Winner: {name}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleVideo}>
        <Text style={styles.buttonText}>Watch video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRestart}>
        <Text style={styles.buttonText}>Play again</Text>
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

export default WinnerScreen;
