import { View, StyleSheet, ViewProps } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

interface SectionProps extends ViewProps {}

const Section: React.FC<SectionProps> = ({ children, style, ...props }) => {
  return (
    <Animated.View style={[styles.container, style]} {...props}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FBFF",
    shadowColor: "#D8E4FA",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
    padding: 15,
  },
});

export default Section;
