import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Platform,
} from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
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
  const translateY = useSharedValue(Platform.OS === "ios" ? 12.5 : 15);

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleFocus = () => {
    translateY.value = withTiming(Platform.OS === "ios" ? 0 : 2.5, {
      duration: 150,
    });
  };

  const handleBlur = () => {
    if (!(props.value && props.value.replaceAll(" ", "").length !== 0)) {
      translateY.value = withTiming(Platform.OS === "ios" ? 12.5 : 15, {
        duration: 150,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          status === "success" && { borderColor: "#6CCD64" },
          status === "error" && { borderColor: "#FC9191" },
        ]}
      >
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
    color: "#9192FC",
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
