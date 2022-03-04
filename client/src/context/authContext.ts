import { createContext, useContext } from "react";
import { UserType } from "types";

export type UserContextType = {
  token?: string;
  setToken: (val?: string) => void;
  user?: UserType;
  setUser: (val?: UserType) => void;
};

export const AuthContext = createContext<UserContextType>({
  token: undefined,
  setToken: (val) => undefined,
  user: undefined,
  setUser: (val) => undefined,
});

export const useAuthCtx = () => useContext(AuthContext);
