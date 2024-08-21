import React, { useEffect, useState } from "react";
import { Typography, Loader, Button } from "ui";
import { Header, Section } from "components";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react-lite";
import { quizService } from "shared/services";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import { QuestionIcon } from "shared/icons";
import { CommonActions } from "@react-navigation/native";

const Content = observer(() => {
  const {
    getQuestion,
    currentNumber,
    sendAnswer,
    currentQuestion,
    goBack,
    initialGet,
  } = quizService;

  const navigation = useTypedNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState(0);
  const [opacity] = useState(new Animated.Value(1));
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: focus !== 0 ? 0.25 : 1,
      duration: focus !== 0 ? 150 : 250,
      useNativeDriver: true,
    }).start();
  }, [focus]);

  useEffect(() => {
    setIsLoading(true);
    const initial = async () => {
      await initialGet();
      setIsInit(true);
    };

    initial();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestion();

      if (data.test_finished) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Result" }],
          })
        );
      }

      if (data.selected_answer && typeof data.selected_answer !== "boolean") {
        handleFocusAnswer(data.selected_answer);
      } else {
        setFocus(0);
      }

      setIsLoading(false);
    };

    if (isInit) {
      fetchData();
    }
  }, [currentNumber, isInit]);

  const handleFocusAnswer = async (answerId: number) => {
    if (focus === 0 || focus !== answerId) {
      setFocus(answerId);
    } else {
      setFocus(0);
    }
  };

  const handleAnswer = async () => {
    await sendAnswer(currentQuestion?.question_id || 0, focus);
  };

  const handleBack = async () => {
    setFocus(-1);

    if (currentQuestion?.question_number === 1) {
      navigation.goBack();
    } else {
      await goBack();
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.wrapper}>
            <Header opacity={opacity} />
            <Section style={[styles.container, { opacity }]}>
              <Typography style={styles.title} gradient>
                Вопрос {currentQuestion?.question_number} из{" "}
                {currentQuestion?.questions_count}
              </Typography>
              <Typography style={styles.question}>
                {currentQuestion?.question_title}
              </Typography>
            </Section>
            {currentQuestion?.answers.map((item, index) => (
              <Animated.View
                key={index}
                style={[{ flex: 1 }, focus !== item.answer_id && { opacity }]}
              >
                <TouchableOpacity
                  style={[
                    { flex: 1 },
                    {
                      borderWidth: 2,
                      borderColor:
                        focus === item.answer_id ? "#9192FC" : "#F8FBFF",
                      borderRadius: 10,
                    },
                  ]}
                  onPress={() => handleFocusAnswer(item.answer_id)}
                  activeOpacity={1}
                >
                  <Section style={styles.answer}>
                    <QuestionIcon />
                    <Typography style={styles.answerTitle}>
                      {item.answer_title}
                    </Typography>
                  </Section>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          <Animated.View
            style={[
              styles.footerButtons,
              { opacity: focus === -1 ? opacity : 1 },
            ]}
          >
            <Button type="red" onPress={handleBack}>
              Назад
            </Button>
            <Button onPress={handleAnswer}>Далее</Button>
          </Animated.View>
        </>
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
    flex: 1,
    marginBottom: 5,
  },
  title: {},
  question: {
    fontSize: 18,
    color: "#000",
  },
  answer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  answerTitle: {
    fontSize: 18,
    color: "#000",
    marginLeft: 15,
    marginRight: 15,
    fontWeight: Platform.OS === "android" ? "800" : "600",
  },
  footerButtons: {
    gap: 5,
  },
});

export default Content;
