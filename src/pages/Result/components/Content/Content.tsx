import React, { useEffect, useState } from "react";
import { Typography, Button, Loader } from "ui";
import { Header, Section } from "components";
import {
  ScrollView,
  SectionList,
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

  const fetchData = async () => {
    await getResult();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []);

  const handleEndTest = () => {
    navigation.navigate("Home");
    setLoading(true);
    fetchData();
  };

  const DATA = [
    { title: "Результаты", data: ["Результаты"] },
    { title: result?.content, data: [result?.content] },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <SectionList
          sections={DATA}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{ marginBottom: 10 }}>
              <Header />
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Button onPress={handleEndTest}>На главный экран</Button>
            </View>
          )}
          keyExtractor={(item, index) => String(item) + index}
          renderItem={({ section: { title } }) => {
            if (title === "Результаты") return null;
            return (
              <View style={styles.content}>
                <RenderHtml
                  contentWidth={width - 20}
                  source={{ html: title || "" }}
                  systemFonts={[...defaultSystemFonts, "Inter"]}
                  tagsStyles={{
                    p: {
                      fontSize: 18,
                      color: "#000",
                      fontFamily: "Inter",
                    },
                  }}
                />
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => {
            if (title === "Результаты") return null;
            return (
              <View style={styles.header}>
                <Typography style={styles.title} gradient>
                  Результаты
                </Typography>
              </View>
            );
          }}
          stickySectionHeadersEnabled
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  wrapper: {
    flex: 1,
    gap: 10,
  },
  header: {
    backgroundColor: "#F8FBFF",
    padding: 15,
    borderRadius: 10,
  },
  title: {},
  content: {
    backgroundColor: "#F8FBFF",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Content;
