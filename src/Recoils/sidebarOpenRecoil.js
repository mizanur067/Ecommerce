import { atom } from "recoil";

const sidebarOpenRecoil = atom({
  key: "sidebarOpenRecoil",        // unique ID (with respect to other atoms/selectors)
  default: false              // default value (initial state)
});
export default sidebarOpenRecoil;