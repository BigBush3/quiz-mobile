import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Typography } from "ui/Typography";
import LinearGradient from "react-native-linear-gradient";

interface ButtonProps extends TouchableOpacityProps {}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[{ width: "100%" }, style]}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#9192FC", "#5C5CDE"]}
        style={styles.container}
      >
        <Typography style={styles.title}>{children}</Typography>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
    marginVertical: 16,
  },
  container: {
    borderRadius: 47.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
