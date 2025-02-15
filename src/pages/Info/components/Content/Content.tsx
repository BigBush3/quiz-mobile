import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import FastImage from "react-native-fast-image";
import { Section } from "components";
import { Button, Typography } from "ui";
import { HomeIcon } from "shared/icons";
import ButtonArrow from "pages/Info/components/ButtonArrow/ButtonArrow.tsx";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation.ts";

const Splash = require("../../../../../assets/images/RoundedSplash.png");

const Content = observer(() => {

  const navigation = useTypedNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FastImage source={Splash} style={styles.splash}/>
        <View style={styles.version}>
          <Typography style={styles.versionTitle}>
            Версия 1.0 (1)
          </Typography>
        </View>
        <ButtonArrow title={"Оценить в App Store"}/>
        <ButtonArrow title={"Лицензионное соглашение"}/>
        <ButtonArrow title={"Политика конфиденциальности"}/>
        <Section>
          <Typography style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut
            labore
            et dolore magna aliqua. Neque egestas congue quisque egestas.Amet massa vitae tortor condime</Typography>
        </Section>
      </View>
      <Button icon contentStyle={styles.button} onPress={navigation.goBack}>
        <HomeIcon/>
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    gap: 10,
    alignItems: "center",
  },
  splash: {
    width: 200,
    height: 200,
  },
  version: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    maxWidth: 154,
  },
  versionTitle: {
    fontSize: 18,
  },
  button: {
    paddingVertical: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
  },
});

export default Content;
