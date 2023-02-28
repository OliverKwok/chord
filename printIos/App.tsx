import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPrint} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import Print from './src/screen/Print';
import Pos from './src/screen/Pos';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
