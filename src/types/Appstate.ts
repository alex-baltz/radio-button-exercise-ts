export interface IAppState {
  customerTypes: string;
  customerTypesRules: number[];
  foodTypes: string;
  foodTypesRules: number[];
  extraTypes: string;
  btnState: boolean;
}

interface IMenuTypes {
  id: string;
  value: string;
  disabled?: boolean;
}

export interface IRuleState {
  "101"?: number[];
  "102"?: number[];
  "103"?: number[];
  "204"?: number[];
  "205"?: number[];
}

export interface ICustomerTypes {
  title: string;
  menu: IMenuTypes[];
  appState: IAppState;
  currentState: "customerTypes" | "foodTypes" | "extraTypes";
  handleState: (e: any) => void;
}
