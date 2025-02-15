import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import React from "react";
import Home from "pages/Home";
import Questions from "pages/Questions";
import Result from "pages/Result";
import { Panel } from "components";
import Profile from "pages/Profile";
import Info from "pages/Info";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PrivateNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: (props) => <Panel {...props}/> }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Questions" component={Questions}/>
      <Stack.Screen name="Result" component={Result}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Info" component={Info} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default PrivateNavigation;
