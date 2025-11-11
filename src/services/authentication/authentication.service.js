
import { auth } from "../../../App";
import { signInWithEmailAndPassword } from "firebase/auth";
export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};