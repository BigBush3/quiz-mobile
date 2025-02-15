import { makeAutoObservable } from "mobx";
import { quizApi } from "shared/api";
import { IQuestion, IResult } from "shared/types";

class QuizService {
  currentQuestion: IQuestion | null = null;
  currentNumber = 1;
  result: IResult | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initialGet = async () => {
    const { data } = await quizApi.getQuestion();
    this.currentNumber = data.question_number;
  };

  getQuestion = async () => {
    const { data } = await quizApi.getQuestion(
      this.currentQuestion?.questions_count ===
        this.currentQuestion?.question_number &&
        typeof this.currentQuestion?.questions_count === "number" &&
        (this.currentQuestion?.questions_count === this.currentNumber ||
          this.currentQuestion?.questions_count === this.currentNumber - 1)
        ? undefined
        : this.currentNumber
    );
    this.currentQuestion = data;
    return data;
  };

  sendAnswer = async (questionId: number, answerId: number) => {
    await quizApi.sendAnswer({
      question_id: questionId,
      answer_id: answerId,
    });
    this.currentNumber += 1;
  };

  goBack = async () => {
    this.currentNumber -= 1;
  };

  getResult = async () => {
    const { data } = await quizApi.getResult();
    this.result = data;
  };
}

export const quizService = new QuizService();
