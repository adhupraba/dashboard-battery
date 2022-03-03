import { SideBarItem } from "types";

import {
  AcUnit,
  KeyOutlined,
  GridViewOutlined,
  AddAlertOutlined,
  DeviceThermostatOutlined,
  MicrowaveOutlined,
  WatchLaterOutlined,
  EvStationOutlined,
  BoltOutlined,
  CellTowerOutlined,
  InsightsOutlined,
  HistoryOutlined,
  PowerSettingsNewOutlined,
} from "@mui/icons-material";

export const drawerWidth = 280;

export const sidebarItems: SideBarItem[] = [
  { icon: GridViewOutlined, name: "Dashboard", route: "dashboard" },
  {
    icon: KeyOutlined,
    name: "E3 Apps",
    route: "",
    nested: [
      { icon: AddAlertOutlined, name: "Peak Shaving & Alert", route: "peak-shaving-alert" },
      { icon: AcUnit, name: "Ventilation", route: "ventilation" },
      { icon: DeviceThermostatOutlined, name: "cooling", route: "cooling" },
      { icon: MicrowaveOutlined, name: "Heat Pump", route: "heat-pump" },
      { icon: WatchLaterOutlined, name: "Out Of Hours", route: "out-of-hours" },
      { icon: EvStationOutlined, name: "Ev Charging", route: "ev-charging" },
      { icon: BoltOutlined, name: "Load Shifting", route: "load-shifting" },
    ],
  },
  { icon: CellTowerOutlined, name: "Demand Response", route: "demand-response" },
  { icon: InsightsOutlined, name: "Insights", route: "insights" },
  { icon: HistoryOutlined, name: "Version History", route: "version-history" },
  { icon: PowerSettingsNewOutlined, name: "Logout", route: "logout" },
];
