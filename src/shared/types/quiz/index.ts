export interface ISendAnswer {
  question_id: number;
  answer_id: number;
}

export interface IAnswer {
  answer_id: number;
  answer_title: string;
}

export interface IQuestion {
  answers: IAnswer[];
  question_id: number;
  question_number: number;
  question_title: string;
  questions_count: number;
  test_finished: boolean;
  selected_answer: boolean | number;
}

export interface IResult {
  day_number: number;
  day_title: string;
  title: string;
  content: string;
}
