import React from "react";
import PublicNavigation from "./navigation/PublicNavigation";
import PrivateNavigation from "./navigation/PrivateNavigation";
import { NavigationContainer } from "@react-navigation/native";
import "shared/utils/ignoreWarnings";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  FadeInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { authService } from "shared/services";
import { observer } from "mobx-react-lite";

const ANIMATION_DURATION = {
  ENTER: 200,
  EXIT: 300,
};

const AnimatedNavigationContainer: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => (
  <Animated.View
    style={{ flex: 1 }}
    entering={FadeInRight.duration(ANIMATION_DURATION.ENTER)}
    exiting={SlideOutLeft.duration(ANIMATION_DURATION.EXIT)}
    {...props}
  >
    {children}
  </Animated.View>
);

const App = () => {
  const { isAuth } = authService;

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        {isAuth && (
          <AnimatedNavigationContainer>
            <PrivateNavigation />
          </AnimatedNavigationContainer>
        )}
        {!isAuth && (
          <AnimatedNavigationContainer>
            <PublicNavigation />
          </AnimatedNavigationContainer>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default observer(App);
