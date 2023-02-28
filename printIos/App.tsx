import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Print from './src/screen/Print';
import Pos from './src/screen/Pos';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Print" component={Print} />
        <Tab.Screen name="Pos" component={Pos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
