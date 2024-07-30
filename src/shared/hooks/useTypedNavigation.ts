import {
  NavigationProp,
  useNavigation as useNavigationFromReactNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "shared/types";

export function useTypedNavigation() {
  const navigation =
    useNavigationFromReactNavigation<NavigationProp<RootStackParamList>>();

  return navigation;
}
