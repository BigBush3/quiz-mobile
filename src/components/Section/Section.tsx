import { View, StyleSheet, ViewProps } from "react-native";
import React from "react";

interface SectionProps extends ViewProps {}

const Section: React.FC<SectionProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
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
