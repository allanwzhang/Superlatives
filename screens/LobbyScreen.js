import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function LobbyScreen({ navigation, route }) {
  const [code, setCode] = useState(0);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // TODO: code should be from database
    // TODO: Make sure random code doesn't exist in db already
    if (route.params && route.params.name) {
      setName(route.params.name);
      if (route.params.code) {
        setCode(route.params.code);
      } else {
        setCode(Math.floor(100000 + Math.random() * 900000));
      }
    }
  }, [route.params]);

  useEffect(() => {
    setPlayers([
      { id: '1', name: name },
      { id: '2', name: 'Sean' },
      { id: '3', name: 'Rashingkar' },
      { id: '4', name: 'Perla' },
      { id: '5', name: 'Isabella' },
      { id: '6', name: 'Libby' },
    ]);
  }, [name]);

  const handleStartGame = () => {
    // TODO: Implement joining lobby logic
    navigation.navigate('Question');
  };

  const handleLeaveLobby = () => {
    // TODO: Implement leaving lobby logic
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lobby</Text>
      <Text style={styles.code}>Code: {code}</Text>
      <View style={styles.grid}>
        {players.map((player, index) => (
          <View 
            key={player.id} 
            style={[styles.gridItem, index === 0 && styles.firstGridItem]}
          >
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLeaveLobby}>
          <Text style={styles.buttonText}>Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Start</Text>
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
