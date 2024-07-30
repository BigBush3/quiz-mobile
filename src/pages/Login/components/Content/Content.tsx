import React, { useState } from "react";
import { Typography, Input, Button } from "ui";
import { Section } from "components";
import { Platform, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { authService } from "shared/services";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import { emailRegex } from "shared/constants";

const Content = observer(() => {
  const { changeProperty, email, requestPassword } = authService;

  const navigation = useTypedNavigation();

  const [status, setStatus] = useState<"success" | "default" | "error">(
    "default"
  );

  const handleNext = async () => {
    await requestPassword();
    navigation.navigate("EnterCode");
  };

  const handleChangeEmail = (email: string) => {
    changeProperty("email", email);
    if (email.length === 0) {
      setStatus("default");
    } else if (emailRegex.test(email)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <Section style={styles.container}>
      <Typography gradient>Вход</Typography>
      <Input
        label="Почта"
        value={email}
        onChangeText={handleChangeEmail}
        status={status}
      />
      <Button
        style={[styles.button, { opacity: status === "success" ? 1 : 0.25 }]}
        onPress={handleNext}
        disabled={status !== "success"}
      >
        Продолжить
      </Button>
    </Section>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 20,
    alignItems: "center",
    flexGrow: 1,
    maxHeight: Platform.OS === "android" ? 250 :230,
  },
  button: {
    opacity: 1,
  },
});

export default Content;
