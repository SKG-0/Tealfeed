import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
const Table = ({matches}) => {
  //circle for wins and loss
  const Circle = ({wins}) => {
    return (
      <View style={wins ? styles.circleW : styles.circleL}>
        <Text style={styles.circleTxt}>{wins ? 'W' : 'L'}</Text>
      </View>
    );
  };
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    //calculating the required data for table from the api
    const mySet = new Set();
    if (matches.length > 0) {
      matches.forEach(match => {
        mySet.add(match.team1);
        mySet.add(match.team2);
      });
      let tempTeams = Array.from(mySet).map(item => ({name: item}));
      let temp = tempTeams.map(team => {
        let wins = 0;
        let losses = 0;
        let noOfMatches = 0;
        let name = team.name;
        let detailsMatches = [];
        matches.forEach(match => {
          if (match.winner != null) {
            if (match.team1 == name || match.team2 == name) {
              noOfMatches = noOfMatches + 1;
              if (match.winner == name) {
                wins = wins + 1;
                detailsMatches.push({
                  win: true,
                  date: new Date(match.date).getTime(),
                });
              } else {
                losses = losses + 1;
                detailsMatches.push({
                  win: false,
                  date: new Date(match.date).getTime(),
                });
              }
            }
          }
        });
        let lastFive = detailsMatches
          .sort((a, b) => a.date < b.date)
          .slice(0, 5);
        let obj = {name, wins, losses, noOfMatches, id: Date.now(), lastFive};
        return obj;
      });
      setTeams(temp);
    }
  }, [matches]);
  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: '#202125',
        paddingHorizontal: 10,
      }}>
      <View style={styles.row}>
        <Text style={styles.text}>Team</Text>
        <View style={styles.row1}>
          <Text style={styles.text1}>M</Text>
          <Text style={styles.text1}>W</Text>
          <Text style={styles.text1}>L</Text>
          <Text style={styles.text1}>Past 5 Match</Text>
        </View>
      </View>
      {teams
        .sort((a, b) => a.wins < b.wins)
        .map((team, index) => (
          <View style={styles.row} key={index + 1}>
            <Text style={styles.text}>{team.name}</Text>
            <View style={styles.row1}>
              <Text style={styles.text1}>{team.noOfMatches}</Text>
              <Text style={styles.text1}>{team.wins}</Text>
              <Text style={styles.text1}>{team.losses}</Text>
              <View style={styles.past5}>
                {team.lastFive.map((item, index) => (
                  <Circle wins={item.win} key={index + 1} />
                ))}
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'white',
    borderBottomWidth: 0.4,
    paddingBottom: 5,
    marginVertical: 5,
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingBottom: 5,
  },
  text: {
    color: 'white',
    marginTop: 5,
  },
  text1: {
    color: 'white',
    paddingHorizontal: 10,
  },
  circleW: {
    height: 15,
    width: 15,
    backgroundColor: 'green',
    borderRadius: 15,
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleL: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 15,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTxt: {
    fontSize: 9,
    color: '#fff',
  },
  past5: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
  },
});
export default Table;
