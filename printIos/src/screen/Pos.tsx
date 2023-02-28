import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Pos = () => {
  return (
    <View style={styles.container}>
      <Text>Coming Soon</Text>
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
