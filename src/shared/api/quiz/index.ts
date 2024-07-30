import { AxiosResponse } from "axios";
import { $api } from "shared/config";
import { IQuestion, IResult, ISendAnswer } from "shared/types";

class QuizApi {
  async getQuestion(): Promise<AxiosResponse<IQuestion>> {
    return $api.get("/tex/question");
  }
  async sendAnswer(data: ISendAnswer): Promise<AxiosResponse<any>> {
    return $api.post("/tex/answer", data);
  }
  async getResult(): Promise<AxiosResponse<IResult>> {
    return $api.get("/tex/results");
  }
}

export const quizApi = new QuizApi();
