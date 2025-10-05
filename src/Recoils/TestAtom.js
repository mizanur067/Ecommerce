import { atom } from "recoil";

const TestAtom = atom({
  key: "TestAtom",        // unique ID (with respect to other atoms/selectors)
  default: []           // default value (initial state)
});
export default TestAtom;