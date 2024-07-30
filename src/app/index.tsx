import React from "react";
import useStorage from "shared/hooks/useStorage";
import PublicNavigation from "./navigation/PublicNavigation";
import PrivateNavigation from "./navigation/PrivateNavigation";
import { NavigationContainer } from "@react-navigation/native";
import "shared/utils/ignoreWarnings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const { storedValue } = useStorage("token", null);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        {storedValue ? <PrivateNavigation /> : <PublicNavigation />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
