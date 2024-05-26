import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

function ResultsScreen({ navigation }) {
  // Dummy data for the pie chart
  const data = [
    {
      name: 'Red',
      population: 45,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Blue',
      population: 30,
      color: 'blue',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Green',
      population: 20,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Yellow',
      population: 5,
      color: 'yellow',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const handleScoreboard = () => {
    navigation.navigate('Scoreboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.winner}>Winner: Rob!</Text>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <TouchableOpacity style={styles.button} onPress={handleScoreboard}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f1ff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9674B4',
    marginBottom: 20,
  },
  winner: {
    fontSize: 20,
    color: '#9674B4',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9674B4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;
