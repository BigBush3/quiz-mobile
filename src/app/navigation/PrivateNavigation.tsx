import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import React from "react";
import Home from "pages/Home";
import Questions from "pages/Questions";
import Result from "pages/Result";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PrivateNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};

export default PrivateNavigation;
