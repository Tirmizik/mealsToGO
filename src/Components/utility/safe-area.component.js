import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import{SafeAreaView} from "react-native-safe-area-context";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${ExpoStatusBar.currentHeight && `margin-top: ${ExpoStatusBar.currentHeight}px`};
   background-color: ${(props) => props.theme.colors.bg.primary};
`;