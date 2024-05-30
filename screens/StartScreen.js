import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDOxMljI2YHgteDlHwjBjrgzr5hmISOpbg",
  authDomain: "superlatives-cd8c1.firebaseapp.com",
  databaseURL: "https://superlatives-cd8c1-default-rtdb.firebaseio.com",
  projectId: "superlatives-cd8c1",
  storageBucket: "superlatives-cd8c1.appspot.com",
  messagingSenderId: "1018084849010",
  appId: "1:1018084849010:web:c1d5358d3fa45ed80999eb",
  measurementId: "G-N117DFW7JW"
};

function StartScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleCreateGame = () => {
    if (name !== '') {
      const gameData = {
        players: { [name]: { name } },
        scores: { [name]: { name, points: 0 } },
        currentRound: 1,
        currentQuestion: 'What is your favorite color?',
        answers: {},
        winner: '',
        creator: name,
        status: 'waiting',
      };

      // Initialize Firebase app
      const app = initializeApp(firebaseConfig);

      // Get the database instance
      const db = getDatabase(app);

      // Create a new game in the Firebase Realtime Database with a 6-digit code
      const gameCode = Math.floor(100000 + Math.random() * 900000).toString();
      const gamesRef = ref(db, `games/${gameCode}`);
      set(gamesRef, gameData)
        .then(() => {
          navigation.navigate('Lobby', { name, code: gameCode });
        })
        .catch((error) => {
          console.error('Error creating game: ', error);
        });
    }
  };

  const handleJoinLobby = () => {
    if (name !== '') {
      navigation.navigate('JoinCode', { name });
    }
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