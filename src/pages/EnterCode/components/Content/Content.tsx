import React, { useEffect, useState } from "react";
import { Typography, Input, Button } from "ui";
import { Section } from "components";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { observer } from "mobx-react-lite";
import { authService } from "shared/services";

const Content = observer(() => {
  const { changeProperty, password, login, requestPassword } = authService;

  const [status, setStatus] = useState<"success" | "default" | "error">(
    "default"
  );

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleNext = async () => {
    const data = await login();
    if (data) {
      setStatus("error");
    }
  };

  const handleChangePassword = (password: string) => {
    changeProperty("password", password);
    if (password.length === 0) {
      setStatus("default");
    } else {
      setStatus("success");
    }
  };

  const handlePressSendCode = async () => {
    if (!(timeLeft > 0)) {
      await requestPassword();
      setTimeLeft(60);
    }
  };

  return (
    <Section
      style={[
        styles.container,
        {
          maxHeight:
            status === "error"
              ? Platform.OS === "android"
                ? 330
                : 310
              : Platform.OS === "android"
              ? 290
              : 270,
        },
      ]}
    >
      <Typography gradient style={styles.title}>
        Вход
      </Typography>
      <Input
        label="Код из почты"
        value={password}
        onChangeText={handleChangePassword}
        status={status}
        errorText="Неверный код"
      />
      <TouchableOpacity disabled={timeLeft > 0} onPress={handlePressSendCode}>
        {timeLeft > 0 ? (
          <View style={styles.sendContainer}>
            <Typography gradient style={[styles.sendCodeDisable]}>
              Отправить код заново
            </Typography>
            <Typography gradient style={styles.time}>
              {formatTime(timeLeft)}
            </Typography>
          </View>
        ) : (
          <Typography gradient style={styles.sendCode}>
            Отправить код заново
          </Typography>
        )}
      </TouchableOpacity>
      <Button
        style={{ opacity: status === "success" ? 1 : 0.25 }}
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
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
  },
  sendContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sendCode: {
    fontSize: 18,
    fontWeight: "400",
  },
  sendCodeDisable: {
    opacity: 0.25,
    fontSize: 18,
    fontWeight: "400",
  },
  time: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Content;
