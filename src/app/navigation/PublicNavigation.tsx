import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import React from "react";
import Login from "pages/Login";
import EnterCode from "pages/EnterCode";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PublicNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="EnterCode" component={EnterCode} />
    </Stack.Navigator>
  );
};

export default PublicNavigation;
