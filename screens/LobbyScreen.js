import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update, push } from 'firebase/database';

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
 
function LobbyScreen({ navigation, route }) {
const [code, setCode] = useState(0);
const [name, setName] = useState("");
const [players, setPlayers] = useState([]);
const [creator, setCreator] = useState('');
const [status, setStatus] = useState('waiting');

useEffect(() => {
    if (route.params && route.params.name) {
    setName(route.params.name);
    if (route.params.code) {
        setCode(route.params.code);

        // Initialize Firebase app
        const app = initializeApp(firebaseConfig);

        // Get the database instance
        const db = getDatabase(app);

        // Reference to the game's data in the database
        const gameRef = ref(db, `games/${route.params.code}`);

        // Listen for changes in the game's data
        onValue(gameRef, (snapshot) => {
        const gameData = snapshot.val();
        if (gameData) {
            setPlayers(Object.values(gameData.players));
            setCreator(gameData.creator);
            setStatus(gameData.status);

            // If the game has started, navigate to the Question screen
            if (gameData.status === 'started') {
            navigation.navigate('Question', { code: route.params.code });
            }
        }
        });
    }
    }
}, [route.params]);

const handleStartGame = () => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${code}`);

    update(gameRef, {
    status: 'started',
    })
    .then(() => {
        navigation.navigate('Question', { code });
    })
    .catch((error) => {
        console.log('Error starting the game:', error);
    });
};

const handleLeaveLobby = () => {
    const db = getDatabase();
    const playerRef = ref(db, `games/${code}/players/${name}`);

    remove(playerRef)
    .then(() => {
        navigation.navigate('Start');
    })
    .catch((error) => {
        console.log('Error leaving the lobby:', error);
    });
};

return (
    <View style={styles.container}>
    <Text style={styles.title}>Lobby</Text>
    <Text style={styles.code}>Code: {code}</Text>
    <View style={styles.grid}>
        {players.map((player, index) => (
        <View key={index} style={[styles.gridItem, index === 0 && styles.firstGridItem]}>
            <Text style={styles.playerName}>{player.name}</Text>
        </View>
        ))}
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLeaveLobby}>
        <Text style={styles.buttonText}>Leave</Text>
        </TouchableOpacity>
        {name === creator && (
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        )}
    </View>
    </View>
);
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f1ff',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9674B4',
    marginBottom: 20,
  },
  code: {
    fontSize: 20,
    color: '#9674B4',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    color: '#9674B4',
    marginBottom: 20,
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
    backgroundColor: '#a3a5c3',
    borderRadius: 5,
  },
  firstGridItem: {
    backgroundColor: '#9674B4', // Lighter color for the first item
  },
  playerName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#9674B4',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LobbyScreen;
