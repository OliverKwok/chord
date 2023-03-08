import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {createRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenList} from '../../type';

import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faNoteSticky} from '@fortawesome/free-solid-svg-icons';

const {width, height} = Dimensions.get('window');

const headerIconList = [
  {
    id: 1,
    text: 'Student',
    logo: faUsers,
    screen: ScreenList.Student,
  },
  {
    id: 2,
    text: 'Enroll',
    logo: faCalendar,
    screen: ScreenList.Enroll,
  },
  {
    id: 3,
    text: 'Course',
    logo: faBook,
    screen: ScreenList.Course,
  },
  {
    id: 4,
    text: 'Admin',
    logo: faNoteSticky,
    screen: ScreenList.Admin,
  },
];

export default function () {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerShadow}>
        <LinearGradient
          colors={['#4c669f', '#2e4577']}
          style={styles.headerOutterContainer}>
          <View style={styles.headerInnerContainer}>
            {headerIconList.map(item => (
              <TouchableOpacity
                style={styles.headerItemContainer}
                key={item.id}
                onPress={() => navigation.navigate(item.screen)}>
                <FontAwesomeIcon icon={item.logo} size={32} color="#dbdbdb" />
                <Text style={styles.headerText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          height: height - (100 + getStatusBarHeight()) - 100 - 50 - 20 * 2,
          borderWidth: 3,
          borderColor: 'red',
        }}>
        <Text>Content</Text>
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: '#00b28f',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
          borderRadius: 20,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Revenue</Text>
          <Text style={{color: 'white'}}>$20,000</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Cost</Text>
          <Text style={{color: 'white'}}>$20,000</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Profit</Text>
          <Text style={{color: 'white'}}>$20,000</Text>
        </View>
      </View>
    </View>
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
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 11,
  },
  headerOutterContainer: {
    height: 100 + getStatusBarHeight(),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerInnerContainer: {
    marginTop: getStatusBarHeight() + 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerItemContainer: {alignItems: 'center'},
  headerText: {color: '#dbdbdb', fontWeight: 'bold', marginTop: 8},
});
