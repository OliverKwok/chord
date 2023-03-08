import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faNoteSticky} from '@fortawesome/free-solid-svg-icons';

export default function () {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <LinearGradient
          colors={['#4c669f', '#2e4577']}
          style={styles.headerContainer}>
          <View style={styles.headerItemContainer}>
            <FontAwesomeIcon icon={faUsers} size={32} color="#dbdbdb" />
            <Text style={styles.headerText}>Student</Text>
          </View>
          <View style={styles.headerItemContainer}>
            <FontAwesomeIcon icon={faCalendar} size={32} color="#dbdbdb" />
            <Text style={styles.headerText}>Enroll</Text>
          </View>
          <View style={styles.headerItemContainer}>
            <FontAwesomeIcon icon={faBook} size={32} color="#dbdbdb" />
            <Text style={styles.headerText}>Course</Text>
          </View>
          <View style={styles.headerItemContainer}>
            <FontAwesomeIcon icon={faNoteSticky} size={32} color="#dbdbdb" />
            <Text style={styles.headerText}>Admin</Text>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#4c669f',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerItemContainer: {alignItems: 'center'},
  headerText: {color: '#dbdbdb', fontWeight: 'bold', marginTop: 8},
});
