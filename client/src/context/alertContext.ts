import { createContext, useContext } from "react";
import { AlertType, UserType } from "types";

export type AlertContextType = {
  alerts: AlertType[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>;
};

export const AlertContext = createContext<AlertContextType>({
  alerts: [],
  setAlerts: (val) => {},
});

export const useAlertCtx = () => useContext(AlertContext);
