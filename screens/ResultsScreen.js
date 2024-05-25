import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
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
    navigation.navigate("Scoreboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text>Winner: Rob!</Text>
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
      <Button title="Next" onPress={handleScoreboard} />
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
