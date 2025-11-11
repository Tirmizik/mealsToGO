import React,{ useEffect,useState} from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/Index";
import { Navigation } from "./src/infrastructure/navigation";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import{signInWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHFufVQke1saa1SdI-KUoDlelQCLaFH6s",
  authDomain: "mealstogo-b43b8.firebaseapp.com",
  projectId: "mealstogo-b43b8",
  storageBucket: "mealstogo-b43b8.firebasestorage.app",
  messagingSenderId: "445992952647",
  appId: "1:445992952647:web:6b4736864846e32cb52262"

};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      signInWithEmailAndPassword(auth, "tech@gmail.com", "test123")
        .then((userCredential) => {
          const user = userCredential.user;
          setIsAuthenticated(true);
        })
        .catch((e) => {

        });
    }, 2000);
  }, []);
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
if (!isAuthenticated) return null;
  return (
    <>
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
       <Navigation />
        </AuthenticationContextProvider>
          </ThemeProvider>
        <ExpoStatusBar style="auto" />
    </>
  );
}
