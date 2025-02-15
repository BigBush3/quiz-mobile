import React, { useEffect, useState } from "react";
import { Typography, Button, Loader } from "ui";
import { Header, Section } from "components";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { observer } from "mobx-react-lite";
import { userService } from "shared/services";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

const Content = observer(() => {
  const { dayInfo, getUser } = userService;

  const { width } = useWindowDimensions();
  const navigation = useTypedNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await getUser();

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleStartTest = () => {
    navigation.navigate("Questions");
  };

  const handleWatchResult = () => {
    navigation.navigate("Result");
  };

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <View style={styles.wrapper}>
          <Header/>
          <Section style={styles.container}>
            {dayInfo?.test_finished ? (
              <>
                <Typography gradient style={styles.completeTitle}>
                  Поздравляем,{"\n"}Вы прошли {dayInfo?.day_number}/10 дней
                </Typography>
                <Button onPress={handleWatchResult}>
                  Посмотреть результаты
                </Button>
              </>
            ) : (
              <>
                <Typography gradient>{dayInfo?.day_title}</Typography>
                <RenderHtml
                  contentWidth={width - 20}
                  source={{ html: dayInfo?.description || "" }}
                  systemFonts={[...defaultSystemFonts, "Inter"]}
                  tagsStyles={{
                    p: {
                      fontSize: 18,
                      color: "#000",
                    },
                  }}
                />
                <Button onPress={handleStartTest}>Начать тест</Button>
              </>
            )}
          </Section>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  wrapper: {
    gap: 10,
  },
  completeTitle: {
    marginBottom: 20,
  },
});

export default Content;
