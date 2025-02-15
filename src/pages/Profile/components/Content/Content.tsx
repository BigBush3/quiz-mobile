import React from "react";
import { StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { Section } from "components";
import { Button, Typography } from "ui";
import { userService } from "shared/services";
import { HomeIcon } from "shared/icons";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation.ts";

const Content = observer(() => {
  const { user } = userService

  const navigation = useTypedNavigation()

  return (
    <View style={styles.container}>
      <Section style={styles.content}>
        <Typography gradient>
          Профиль
        </Typography>
        <Typography style={styles.email}>
          Email: {user?.email}
        </Typography>
      </Section>
      <Button icon contentStyle={styles.button} onPress={navigation.goBack}>
        <HomeIcon/>
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    marginTop: 5,
  },
  email: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    paddingVertical: 10,
  },
});

export default Content;
