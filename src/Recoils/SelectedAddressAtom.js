import { atom } from "recoil";

const SelectedAddressAtom = atom({
  key: "SelectedAddressAtom",        // unique ID (with respect to other atoms/selectors)
  default: ""             // default value (initial state)
});
export default SelectedAddressAtom;