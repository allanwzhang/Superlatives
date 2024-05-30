import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';
import { 
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID 
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
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