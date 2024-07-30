import React from "react";
import Section from "components/Section/Section";
import { Logo, Typography } from "ui";
import { StyleSheet, View } from "react-native";
import { userService } from "shared/services";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  const { dayInfo } = userService;

  return (
    <Section style={styles.container}>
      <Logo />
      <View style={styles.content}>
        <Typography style={styles.title}>
          Добро пожаловать, пользователь!
        </Typography>
        <Typography style={styles.subtitle}>{dayInfo?.day_title}</Typography>
      </View>
    </Section>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  content: {
    gap: 10,
    flex: 1,
  },
  title: {
    color: "#999999",
    fontSize: 18,
  },
  subtitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Header;
