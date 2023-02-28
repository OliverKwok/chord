import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPrint} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screen/Login';
import Print from './src/screen/Print';
import Pos from './src/screen/Pos';

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
              <Text style={[styles.tabText, focused && {fontWeight: 'bold'}]}>
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
                  icon={faUser}
                  size={30}
                  color={focused ? '#0d3b66' : '#666666'}
                />
              </View>
              <Text style={[styles.tabText, focused && {fontWeight: 'bold'}]}>
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
