import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import React from "react";
import { Typography } from "ui/Typography";
import LinearGradient from "react-native-linear-gradient";

interface ButtonProps extends TouchableOpacityProps {
  type?: "red" | "default" | "error";
  icon?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  contentStyle,
  type = "default",
  icon = false,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[{ width: "100%" }, style]}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={
          type === "red"
            ? ["#FC9191", "#DE5C6C"]
            : type === "error"
            ? ["transparent", "transparent"]
            : ["#9192FC", "#5C5CDE"]
        }
        style={[
          type === "error" ? styles.containerError : styles.container,
          contentStyle,
        ]}
      >
        {icon ? (
          children
        ) : (
          <Typography
            style={type === "error" ? styles.titleError : styles.title}
          >
            {children}
          </Typography>
        )}
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
  titleError: {
    fontWeight: "700",
    fontSize: 18,
    color: "#F07272",
    marginVertical: 16,
  },
  container: {
    borderRadius: 47.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  containerError: {
    borderRadius: 47.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F07272",
  },
});
