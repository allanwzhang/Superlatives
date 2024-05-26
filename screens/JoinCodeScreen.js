import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function JoinCodeScreen({ navigation, route }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (route.params && route.params.name) {
      setName(route.params.name);
    }
  }, [route.params]);

  const handleJoinLobby = () => {
    // TODO: Implement joining lobby logic
    if (code !== "") {
      navigation.navigate('Lobby', { name: name, code: code });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Game</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Game Code"
          placeholderTextColor="#a3a5c3"
          value={code}
          onChangeText={setCode}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleJoinLobby}>
        <Text style={styles.buttonText}>Enter Game</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#9674B4',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default JoinCodeScreen;
