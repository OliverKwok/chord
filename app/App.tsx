import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPrint} from '@fortawesome/free-solid-svg-icons';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screen/Login';
import Print from './src/screen/Print';
import Pos from './src/screen/Pos/Pos';
import Student from './src/screen/Pos/Student';
import Enroll from './src/screen/Pos/Enroll';
import Course from './src/screen/Pos/Course';
import Admin from './src/screen/Pos/Admin';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 100, backgroundColor: '#f1f1f1'},
      }}>
      <Tab.Screen
        name="Print"
        component={Print}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabContainer}>
              <View style={{marginBottom: 4}}>
                <FontAwesomeIcon
                  icon={faPrint}
                  size={30}
                  color={focused ? '#0d3b66' : '#666666'}
                />
              </View>
              <Text
                style={[
                  styles.tabText,
                  focused && {fontWeight: 'bold', color: '#0d3b66'},
                ]}>
                Print
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pos"
        component={Pos}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabContainer}>
              <View style={{marginBottom: 4}}>
                <FontAwesomeIcon
                  icon={faAddressCard}
                  size={30}
                  color={focused ? '#0d3b66' : '#666666'}
                />
              </View>
              <Text
                style={[
                  styles.tabText,
                  focused && {fontWeight: 'bold', color: '#0d3b66'},
                ]}>
                Pos
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="Enroll" component={Enroll} />
        <Stack.Screen name="Course" component={Course} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {color: '#666666', textTransform: 'uppercase', fontSize: 12},
});
