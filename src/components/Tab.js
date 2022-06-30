import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
const Matches = ({text, setTab, tab}) => {
  //setting the tabs
  return (
    <TouchableOpacity
      style={tab == text ? styles.containerselect : styles.container}
      onPress={() => {
        setTab(text);
      }}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: '#008081',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  containerselect: {
    width: '50%',
    backgroundColor: '#008081',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});
export default Matches;
