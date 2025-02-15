import React, { useEffect, useState } from "react";
import { Typography, Loader, Button } from "ui";
import { Header, Section } from "components";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { observer } from "mobx-react-lite";
import { quizService } from "shared/services";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import { QuestionIcon } from "shared/icons";
import { CommonActions } from "@react-navigation/native";
import { toJS } from "mobx";

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
  const opacity = useSharedValue(1);
  const [isInit, setIsInit] = useState(false);
  const [error, setError] = useState(false);

  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    opacity.value = withTiming(focus !== 0 ? 0.25 : 1, {
      duration: focus !== 0 ? 150 : 250,
    });
  }, [focus]);

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedFooterStyle = useAnimatedStyle(
    () => ({
      opacity: focus === -1 ? opacity.value : 1,
    }),
    [focus]
  );

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

      if (
        data.selected_answer &&
        typeof data.selected_answer !== "boolean" &&
        !data.test_finished
      ) {
        handleFocusAnswer(data.selected_answer);
      } else {
        setFocus(0);
      }

      setIsLoading(false);
      setIsLoadingAnswer(false);
    };

    if (isInit) {
      fetchData();
    }
  }, [currentNumber, isInit]);

  useEffect(() => {
    if (currentQuestion) {

    }
  }, [currentQuestion]);

  const handleFocusAnswer = (answerId: number) => {
    if (focus === 0 || focus !== answerId) {
      setFocus(answerId);
    } else {
      setFocus(0);
    }
  };

  const handleAnswer = async () => {
    setIsLoadingAnswer(true);
    if (focus === -1 || focus === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      setIsLoadingAnswer(false);
      return;
    }
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

  interface AnswerItemProps {
    item: {
      answer_id: number;
      answer_title: string;
    };
    focus: number;
    opacity: Animated.SharedValue<number>;
    onPress: (answerId: number) => void;
  }

  const AnswerItem: React.FC<AnswerItemProps> = ({
    item,
    focus,
    opacity,
    onPress,
  }) => {
    const animatedStyle = useAnimatedStyle(
      () => ({
        opacity: focus !== item.answer_id ? opacity.value : 1,
      }),
      [focus]
    );

    return (
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <TouchableOpacity
          style={[
            { flex: 1 },
            {
              borderWidth: 2,
              borderColor: focus === item.answer_id ? "#9192FC" : "#F8FBFF",
              borderRadius: 10,
            },
          ]}
          onPress={() => onPress(item.answer_id)}
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
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.wrapper}>
            <Header opacity={opacity} />
            <Section style={[styles.container, animatedOpacityStyle]}>
              <Typography style={styles.title} gradient>
                Вопрос {currentQuestion?.question_number} из{" "}
                {currentQuestion?.questions_count}
              </Typography>
              <Typography style={styles.question}>
                {currentQuestion?.question_title}
              </Typography>
            </Section>
            {currentQuestion?.answers.map((item, index) => (
              <AnswerItem
                key={index}
                item={toJS(item)}
                focus={focus}
                opacity={opacity}
                onPress={handleFocusAnswer}
              />
            ))}
          </View>
          <Animated.View style={[styles.footerButtons, animatedFooterStyle]}>
            <Button type="red" onPress={handleBack}>
              Назад
            </Button>
            {error ? (
              <Button type="error" disabled>
                Выберите вариант ответа
              </Button>
            ) : (
              <Button onPress={handleAnswer}>
                {isLoadingAnswer ? (
                  <Loader size={22} />
                ) : (
                  <>
                    {(currentQuestion?.questions_count || 0) ===
                    currentQuestion?.question_number
                      ? "Завершить тест"
                      : "Далее"}
                  </>
                )}
              </Button>
            )}
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
