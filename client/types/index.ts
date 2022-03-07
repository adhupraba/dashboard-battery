type SideBarItemBasic = {
  icon: any;
  name: string;
  route: string;
};

export type SideBarItem = SideBarItemBasic & {
  nested?: SideBarItemBasic[];
};

export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type AlertType = {
  id: number;
  name: string;
  priceSignal: string;
  criteria: string;
  criteriaValue: number;
  email: string;
  dayType: string;
};

export type ErrorType = { message: string; field: string };
