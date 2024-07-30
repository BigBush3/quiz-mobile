import React, { useEffect, useState } from "react";
import { Typography, Button, Loader } from "ui";
import { Header, Section } from "components";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { observer } from "mobx-react-lite";
import { quizService } from "shared/services";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

const Content = observer(() => {
  const { result, getResult } = quizService;

  const { width } = useWindowDimensions();
  const navigation = useTypedNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await getResult();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEndTest = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.wrapper}>
          <Header />
          <Section style={styles.container}>
            <Typography gradient>{result?.title}</Typography>
            <RenderHtml
              contentWidth={width - 20}
              source={{ html: result?.content || "" }}
              systemFonts={[...defaultSystemFonts, "Inter"]}
              tagsStyles={{
                p: {
                  fontSize: 18,
                  color: "#000",
                  fontFamily: "Inter",
                },
              }}
            />
            <Button onPress={handleEndTest}>На главный экран</Button>
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
