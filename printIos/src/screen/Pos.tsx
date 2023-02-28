import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons';

const Pos = () => {
  return (
    <View style={styles.container}>
      <Text>Coming Soon</Text>
      <FontAwesomeIcon icon={faMugSaucer} size={50} />
    </View>
  );
};

export default Pos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
