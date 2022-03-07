import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { EmptyPage, Login, PeakShaving, Register } from "./pages";
import { Wrapper } from "./components";
import "./App.css";
import { AuthContext } from "./context/authContext";
import { AlertType, UserType } from "types";
import { useJwt } from "react-jwt";
import { AlertContext } from "./context/alertContext";

const App = () => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserType>();
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const localToken = localStorage.getItem("battery-token");
  const { decodedToken, isExpired } = useJwt(localToken || "");
  console.log({ decodedToken });

  useEffect(() => {
    if (localToken) {
      if (isExpired) {
        localStorage.removeItem("battery-token");
      } else {
        setToken(localToken);
        setUser(decodedToken as UserType);
      }
    } else {
      setToken(undefined);
      setUser(undefined);
    }
  }, [decodedToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <AlertContext.Provider value={{ alerts, setAlerts }}>
        <Router>
          <Routes>
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
            <Route
              path="/peak-shaving-alert"
              element={
                token ? (
                  <Wrapper>
                    <PeakShaving />
                  </Wrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/:slug"
              element={
                token ? (
                  <Wrapper>
                    <EmptyPage />
                  </Wrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AlertContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
