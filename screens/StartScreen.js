import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function StartScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleCreateGame = () => {
    // TODO: Implement joining lobby logic
    // TODO: implement popups to tell people that there must be a name
    if(name != "") navigation.navigate('Lobby', { name: name });
  };

  const handleJoinLobby = () => {
    // TODO: Implement joining lobby logic
    // TODO: implement popups to tell people that there must be a name
    if(name != "") navigation.navigate('JoinCode', { name: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Enter Your Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button title="Create Game" onPress={handleCreateGame} />
      <Button title="Join Lobby" onPress={handleJoinLobby} />
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

export default StartScreen;