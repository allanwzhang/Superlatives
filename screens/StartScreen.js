import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function StartScreen({ navigation }) {
  const [name, setName] = useState('');
 //TODO: Add way to upload photo
  const handleCreateGame = () => {
    if (name !== "") navigation.navigate('Lobby', { name: name });
  };

  const handleJoinLobby = () => {
    if (name !== "") navigation.navigate('JoinCode', { name: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Your Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#a3a5c3"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleJoinLobby}>
          <Text style={styles.buttonText}>Join Lobby</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f8f1ff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9674B4',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9674B4',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#a3a5c3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#9674B4',
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#9674B4',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StartScreen;
