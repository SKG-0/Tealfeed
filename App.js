import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Search from './src/components/Search';
import Tab from './src/components/Tab';
import Table from './src/components/Table';
import Matches from './src/components/Matches';
import axios from 'axios';
const App = () => {
  const [matches, setMatches] = useState([]);
  const [tab, setTab] = useState('Matches');
  const [finalarr, setfinalarr] = useState([]);
  //fetching matches data from api
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://gist.githubusercontent.com/hdck007/57650c774d9631c097db855bf110a4b6/raw/58b00de2a8c06831fda2f471e1b635a90208a4be/ipl.json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.searchcont}>
        {/* final array contains the filtered array based on the user's search */}
        <Search
          matches={matches}
          finalarr={finalarr}
          setfinalarr={setfinalarr}
        />
      </View>
      <View style={styles.divisions}>
        <Tab text={'Matches'} setTab={setTab} tab={tab} />
        <Tab text={'Table'} setTab={setTab} tab={tab} />
      </View>
      {/* checking for tab whether matches or table is to be rendered */}
      {tab == 'Matches' ? (
        <Matches
          matches={matches}
          //final array contains the filtered array based on the user's search
          finalarr={finalarr}
          setfinalarr={setfinalarr}
        />
      ) : (
        <Table matches={matches} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  searchcont: {
    backgroundColor: '#008081',
    height: '17%',
  },
  divisions: {
    display: 'flex',
    flexDirection: 'row',
  },
});
export default App;
