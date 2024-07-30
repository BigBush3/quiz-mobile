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

  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.wrapper}>
          <Header />
          <Section style={styles.container}>
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
            <Button
              style={[{ opacity: dayInfo?.test_finished ? 0.25 : 1 }]}
              disabled={dayInfo?.test_finished}
              onPress={handleStartTest}
            >
              Начать тест
            </Button>
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
});

export default Content;
