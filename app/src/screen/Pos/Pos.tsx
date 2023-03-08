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
          // backgroundColor: 'white',
        }}>
        <View style={styles.headerShadow}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c669f',
  },
  headerShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 11,
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
