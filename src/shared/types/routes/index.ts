import { ComponentType } from "react";

export type RootStackParamList = {
  Login: undefined;
  EnterCode: undefined;

  Home: undefined;
  Questions: undefined;
  Result: undefined;
};

export interface IRoute {
  name: keyof RootStackParamList;
  component: ComponentType;
}
