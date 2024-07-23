import { createContext, useContext } from "react";
import CompanyStore from "./companyStore";
import InformationStore from "./informationStore";
import CustomPromptStore from "./customPromptStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
  companyStore: CompanyStore;
  informationStore: InformationStore;
  customPromptStore: CustomPromptStore;
  commonStore: CommonStore;
  userStore: UserStore;
}

export const store: Store = {
  companyStore: new CompanyStore(),
  informationStore: new InformationStore(),
  customPromptStore: new CustomPromptStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
