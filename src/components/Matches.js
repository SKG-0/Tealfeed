import React from 'react';
import {ScrollView} from 'react-native';
import Match from './Match';
const Matches = ({matches, finalarr}) => {
  return (
    <ScrollView style={{height: '100%', backgroundColor: '#202125'}}>
      {/* if filtered data length is greater than zero then render it otherwise render complete match data */}
      {finalarr.length > 0
        ? finalarr.map(match => <Match match={match} key={match.id} />)
        : matches.map(match => <Match match={match} key={match.id} />)}
    </ScrollView>
  );
};
export default Matches;
