import { useState } from "react";
import "./App.scss";
import * as data from "./api/menuState.json";

import RadioGroup from "./components/RadioGroup";

import { IAppState, IRuleState } from "./types/Appstate";

const App = () => {
  const radioData = data;
  const menusState = radioData.menus;
  const rulesState: IRuleState = radioData.rules;

  const [customerTypes, foodTypes, extraTypes] = menusState;

  const initialState: IAppState = {
    customerTypes: "",
    customerTypesRules: [],
    foodTypes: "",
    foodTypesRules: [],
    extraTypes: "",
    btnState: true,
  };

  const [appState, setAppState] = useState<IAppState>(initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const getRuleSet = (key: string) =>
    Object.keys(rulesState).find((ruleState) => ruleState === key);

  const foodOptions = foodTypes?.map((food) => ({
    id: food.id,
    value: food.value,
    disabled:
      appState.customerTypesRules.length === 0 ||
      appState.customerTypesRules.includes(Number(food.id)),
  }));

  const extraOptions = extraTypes?.map((ext) => {
    const combinedRulesets = appState.customerTypesRules.concat(
      appState.foodTypesRules
    );
    return {
      id: ext.id,
      value: ext.value,
      disabled:
        (appState.foodTypesRules.length === 0 && !appState.foodTypes) ||
        combinedRulesets.includes(Number(ext.id)),
    };
  });

  const handleCustomerTypes = (key: string) => {
    const hasRuleSet = getRuleSet(key);
    const ruleSets = hasRuleSet ? rulesState[key as keyof IRuleState] : [];

    setAppState((state) => ({
      ...state,
      customerTypes: key,
      customerTypesRules: ruleSets!,
      foodTypes: "",
      foodTypesRules: [],
      extraTypes: "",
      btnState: true,
    }));
  };

  const handleMenuTypes = (key: string) => {
    const hasRuleSet = getRuleSet(key);
    const ruleSets = hasRuleSet ? rulesState[key as keyof IRuleState] : [];
    setAppState((state) => ({
      ...state,
      foodTypes: key,
      foodTypesRules: ruleSets!,
      extraTypes: "",
      btnState: true,
    }));
  };

  const handleExtraTypes = (key: string) => {
    setAppState((state) => ({
      ...state,
      extraTypes: key,
      btnState: false,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="radio-group-container">
        <RadioGroup
          title={"Customer Type"}
          appState={appState}
          currentState={"customerTypes"}
          handleState={handleCustomerTypes}
          menu={customerTypes}
        />
        <RadioGroup
          title={"Food"}
          appState={appState}
          currentState={"foodTypes"}
          handleState={handleMenuTypes}
          menu={foodOptions}
        />
        <RadioGroup
          title={"Extras"}
          appState={appState}
          currentState={"extraTypes"}
          handleState={handleExtraTypes}
          menu={extraOptions}
        />
      </div>
      <button
        disabled={appState.btnState}
        className={appState.btnState === true ? "disabled" : undefined}
      >
        Submit
      </button>
    </form>
  );
};

export default App;
