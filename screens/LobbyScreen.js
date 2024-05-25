import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function LobbyScreen({ navigation, route }) {
  const [code, setCode] = useState(0);
  // TODO: This should be an array of names of all the users but for now its just one
  const [name, setName] = useState("");

  // TODO: Code won't be generated every time this screen is loaded, should have some logic with database
  useEffect(() => {
    if(route.params && route.params.name) {
      setName(route.params.name);
      if(route.params.code) {
        setCode(route.params.code);
      } else {
        setCode(Math.floor(100000 + Math.random() * 900000));
      }
    }
  }, []);

  const handleStartGame = () => {
    // TODO: Implement joining lobby logic
    navigation.navigate('Question');
  };

  const handleLeaveLobby = () => {
    // TODO: Implement joining lobby logic
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Code: {code}</Text>
      <Text>{name}</Text>
      <Button title="Start" onPress={handleStartGame} />
      <Button title="Leave" onPress={handleLeaveLobby} />
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

export default LobbyScreen;