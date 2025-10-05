import { atom } from "recoil";

const DetailsProductAtom = atom({
  key: "DetailsProductAtom",        // unique ID (with respect to other atoms/selectors)
  default: ""             // default value (initial state)
});
export default DetailsProductAtom;