import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ResultsScreen() {
  // TODO: Fetch and display vote counts

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      {/* TODO: Render pie chart */}
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
});

export default ResultsScreen;