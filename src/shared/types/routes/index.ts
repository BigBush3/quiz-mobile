import { ComponentType } from "react";

export type RootStackParamList = {
  Login: undefined;
  EnterCode: undefined;

  Home: undefined;
  Questions: undefined;
  Result: undefined;
  Profile: undefined;
  Info: undefined;
};

export interface IRoute {
  name: keyof RootStackParamList;
  component: ComponentType;
}
