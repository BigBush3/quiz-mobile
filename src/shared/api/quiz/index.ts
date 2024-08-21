import { AxiosResponse } from "axios";
import { $api } from "shared/config";
import { IQuestion, IResult, ISendAnswer } from "shared/types";

class QuizApi {
  async getQuestion(
    numberQuestion?: number
  ): Promise<AxiosResponse<IQuestion>> {
    if (numberQuestion) {
      return $api.get(`/tex/question/${numberQuestion}`);
    } else {
      return $api.get(`/tex/question`);
    }
  }
  async sendAnswer(data: ISendAnswer): Promise<AxiosResponse<any>> {
    return $api.post("/tex/answer", data);
  }
  async getResult(): Promise<AxiosResponse<IResult>> {
    return $api.get("/tex/results");
  }
  async goBack(): Promise<AxiosResponse<any>> {
    return $api.post("/tex/answer/back");
  }
}

export const quizApi = new QuizApi();
