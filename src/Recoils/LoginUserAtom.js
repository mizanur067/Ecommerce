import { atom } from "recoil";

const LoginUserAtom = atom({
  key: "LoginUserAtom",        // unique ID (with respect to other atoms/selectors)
  default: ""          // default value (initial state)
});
export default LoginUserAtom;