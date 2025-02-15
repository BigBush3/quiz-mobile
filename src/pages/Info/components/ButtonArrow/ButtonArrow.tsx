import React from "react";

import { Section } from "components";
import { Typography } from "ui";
import { RightIcon } from "shared/icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ButtonArrowProps {
  title: string;
}

const ButtonArrow: React.FC<ButtonArrowProps> = ({ title }) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Section style={styles.container}>
        <Typography style={styles.title}>{title}</Typography>
        <RightIcon />
      </Section>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
  },
  title: {
    fontSize: 18,
  },
});

export default ButtonArrow;
