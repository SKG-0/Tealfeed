import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
const Search = ({matches, finalarr, setfinalarr}) => {
  const [arr, setarr] = useState([]);
  // action for filtering data when cross action is performed
  const filterCross = localArr => {
    let emp = [];
    if (localArr.length > 0) {
      localArr.forEach(item => {
        matches.forEach(match => {
          let tem1 = match.team1.toUpperCase();
          let tem2 = match.team2.toUpperCase();
          let ite = item.toUpperCase();
          if (tem1 == ite || tem2 == ite) {
            emp.push(match);
          }
        });
      });
    } else {
      setfinalarr([]);
    }
    setfinalarr(emp);
  };
  // action for filtering data when input is submitted
  const filter = text => {
    let sam = [...arr, text];

    sam.forEach(item => {
      matches.forEach(match => {
        let tem1 = match.team1.toUpperCase();
        let tem2 = match.team2.toUpperCase();
        let ite = item.toUpperCase();
        if (tem1 == ite || tem2 == ite) {
          setfinalarr(old => [...old, match]);
        }
      });
    });
  };
  return (
    <View style={styles.searchcontainer}>
      <TextInput
        placeholder="Select an item"
        style={styles.input}
        onSubmitEditing={text => {
          //setting data to the state and calling filter function and also removing duplicates
          text.persist();
          if (arr.length == 0) {
            setarr(old => [...old, text.nativeEvent.text]);
            filter(text.nativeEvent.text);
          } else if (text.nativeEvent.text != arr[arr.length - 1]) {
            setarr(old => [...old, text.nativeEvent.text]);
            filter(text.nativeEvent.text);
          }
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {arr.map((item, index) =>
            item.length > 0 ? (
              <View style={styles.itemcont} key={index + 1}>
                <Text style={styles.itemtext}>{item}</Text>
                <TouchableOpacity
                  onPress={() => {
                    let data = arr.filter(e => e !== item);
                    setarr(arr.filter(e => e !== item));
                    filterCross(data);
                  }}>
                  <Image
                    source={require('../images/multiply.png')}
                    style={styles.cross}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View key={1}></View>
            ),
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingLeft: 15,
    marginTop: 10,
  },
  searchcontainer: {
    marginTop: 10,
  },
  itemcont: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    height: 40,
  },
  itemtext: {
    paddingHorizontal: 8,
    fontSize: 16,
    paddingVertical: 7,
  },
  cross: {
    width: 20,
    height: 20,
  },
});
export default Search;
