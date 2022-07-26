import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Authenticate from "./components/authenticate/Authenticate";
import AllActivities from "./components/activities/AllActivities";
import ActivitiesContainer from "./components/activities/ActivitiesContainer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <Authenticate>
              <HomePage />
            </Authenticate>
          }
        >
          <Route path="all" element={<AllActivities />} />
          <Route path="" element={<ActivitiesContainer />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
