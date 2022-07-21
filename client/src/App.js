import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Authenticate from "./components/authenticate/Authenticate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticate>
              <HomePage />
            </Authenticate>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
