import React, { useEffect, useState } from "react";
import { Typography, Loader } from "ui";
import { Header, Section } from "components";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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

      setLoading(false);
    };

    fetchData();
  }, [currentNumber]);

  const handleAnswer = (answerId: number) => {
    sendAnswer(currentQuestion?.question_id || 0, answerId);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.wrapper}>
          <Header />
          <Section style={styles.container}>
            <Typography style={styles.title} gradient>
              Вопрос {currentQuestion?.question_number} из{" "}
              {currentQuestion?.questions_count}
            </Typography>
            <Typography style={styles.question}>
              {currentQuestion?.question_title}
            </Typography>
          </Section>
          {currentQuestion?.answers.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ flex: 1 }}
              onPress={() => handleAnswer(item.answer_id)}
            >
              <Section style={styles.answer}>
                <QuestionIcon />
                <Typography style={styles.answerTitle}>
                  {item.answer_title}
                </Typography>
              </Section>
            </TouchableOpacity>
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
  },
});

export default Content;
