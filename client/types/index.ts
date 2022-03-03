type SideBarItemBasic = {
  icon: any;
  name: string;
  route: string;
};

export type SideBarItem = SideBarItemBasic & {
  nested?: SideBarItemBasic[];
};
