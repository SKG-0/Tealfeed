import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Match = ({match}) => {
  return (
    <View style={styles.matchcontainer}>
      <View>
        <Text style={styles.text}>{match.team1}</Text>
        <Text style={styles.text}>{match.team2}</Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'column',
          marginBottom: 20,
        }}>
        <Text style={styles.date}>{match.date}</Text>
        <Text style={styles.winner}>
          Winner : {/* checking whether there is any winner */}
          {match.winner == null ? 'Not decided yet' : `${match.winner}`}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  matchcontainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 15,
    color: 'white',
  },
  date: {
    color: 'white',
    marginTop: 10,
    marginRight: 10,
    textAlign: 'right',
  },
  winner: {
    color: 'white',
    marginRight: 10,
    fontSize: 10,
  },
});
export default Match;
