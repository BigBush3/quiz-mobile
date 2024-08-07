import React, { useEffect, useState } from "react";
import { Typography, Loader } from "ui";
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
  const { getQuestion, currentNumber, sendAnswer, currentQuestion } =
    quizService;

  const navigation = useTypedNavigation();

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [focus, setFocus] = useState(0);

  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: loading ? 0.25 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [loading]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setLoading(true);
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

      setFocus(0);
      setLoading(false);
      setIsLoading(false);
    };

    fetchData();
  }, [currentNumber]);

  const handleAnswer = async (answerId: number) => {
    setFocus(answerId);
    setLoading(true);
    await sendAnswer(currentQuestion?.question_id || 0, answerId);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                onPress={() => handleAnswer(item.answer_id)}
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
});

export default Content;
