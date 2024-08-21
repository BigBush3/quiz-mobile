import { Animated, StyleSheet, TextProps } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

interface TypographyProps extends React.PropsWithChildren, TextProps {
  gradient?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  gradient = false,
}) => {
  const GradientText = (props: TextProps) => {
    return (
      <MaskedView maskElement={<Animated.Text {...props} />}>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#9192FC", "#5C5CDE"]}
        >
          <Animated.Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  if (gradient) {
    return (
      <GradientText
        style={[
          styles.gradientText,
          ...(Array.isArray(style) ? style : [style]),
        ]}
      >
        {children}
      </GradientText>
    );
  }

  return (
    <Animated.Text
      style={[styles.text, ...(Array.isArray(style) ? style : [style])]}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  gradientText: {
    fontFamily: "Inter",
    fontSize: 27,
    fontWeight: "600",
  },
  text: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
  },
});
