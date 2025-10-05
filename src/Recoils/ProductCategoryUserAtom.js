import { atom } from "recoil";

const ProductCategoryUserAtom = atom({
  key: "ProductCategoryUserAtom",        // unique ID (with respect to other atoms/selectors)
  default: ""             // default value (initial state)
});
export default ProductCategoryUserAtom;