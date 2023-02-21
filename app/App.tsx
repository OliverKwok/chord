import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screen/Login";
import Main from "./src/screen/Main";
import PrintPdf from "./src/screen/PrintPdf";

import { RootStackParamList, ScreenList } from "./src/type";
const RootStack = createNativeStackNavigator<RootStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={ScreenList.Main}>
        <RootStack.Screen name={ScreenList.Login} component={Login} />
        <RootStack.Screen name={ScreenList.Main} component={Main} />
        <RootStack.Screen name={ScreenList.PrintPdf} component={PrintPdf} />
        {/* <RootStack.Screen name={ScreenList.PdfViewer} component={PdfViewer} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
