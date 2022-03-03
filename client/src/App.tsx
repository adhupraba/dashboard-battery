import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmptyPage, PeakShaving } from "./pages";
import { Wrapper } from "./components";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/peak-shaving-alert"
          element={
            <Wrapper>
              <PeakShaving />
            </Wrapper>
          }
        />
        <Route
          path="/:slug"
          element={
            <Wrapper>
              <EmptyPage />
            </Wrapper>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
