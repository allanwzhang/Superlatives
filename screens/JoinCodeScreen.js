import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function JoinCodeScreen({ navigation, route }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if(route.params && route.params.name) {
      setName(route.params.name);
    }
  }, []);

  const handleJoinLobby = () => {
    // TODO: Implement joining lobby logic
    navigation.navigate('Lobby', { name: name, code: code });
  };

  return (
    <View style={styles.container}>
        <View style={styles.inputRow}>
        <Text style={styles.label}>Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Game Code"
          value={code}
          onChangeText={setCode}
        />
      </View>
      <Button title="Enter Game" onPress={handleJoinLobby} />
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

export default JoinCodeScreen;