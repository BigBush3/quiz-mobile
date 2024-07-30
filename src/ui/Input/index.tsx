import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Platform,
} from "react-native";
import React from "react";
import { Typography } from "ui";

interface InputProps extends TextInputProps {
  label: string;
  status?: "success" | "error" | "default";
  errorText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  status = "default",
  errorText,
  ...props
}) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          status === "success" && { borderColor: "#6CCD64" },
          status === "error" && { borderColor: "#FC9191" },
        ]}
      >
        <Typography style={styles.title} gradient>
          {label}
        </Typography>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          {...props}
        />
      </View>
      {status === "error" && errorText && (
        <Typography style={styles.error}>{errorText}</Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flex: 1,
  },
  container: {
    borderColor: "#5C5CDE40",
    borderWidth: 2,
    maxHeight: Platform.OS === "android" ? 85 : 70,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 25,
    gap: Platform.OS === "android" ? 0 : 2,
    borderRadius: 15,
  },
  title: {
    opacity: 0.5,
    fontSize: 18,
    fontWeight: "400",
  },
  input: {
    fontSize: 18,
    color: "#000",
  },
  error: {
    marginVertical: 20,
    color: "#FC9191",
    fontSize: 18,
    fontWeight: "400",
  },
});
