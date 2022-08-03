import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Authenticate from "./components/authenticate/Authenticate";
import ActivitiesContainer from "./components/activities/ActivitiesContainer";
import EditActivity from "./components/activities/EditActivity";
import { useSelector } from "react-redux";
import AllActivitiesContainer from "./components/activities/AllActivitiesContainer";
import MessagesContainer from "./components/messages/MessagesContainer";
import Conversation from "./components/messages/Conversation";
import NutritionContainer from "./components/nutrition/NutritionContainer";
import Favourites from "./components/nutrition/Favourites";

const App = () => {
  const { navigateLogin } = useSelector((state) => state.authentication);
  return (
    <div>
      {navigateLogin && <Navigate to="/login" replace={true} />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route
          path="home"
          element={
            <Authenticate>
              <HomePage />
            </Authenticate>
          }
        >
          <Route
            path="all"
            element={
              <Authenticate>
                <AllActivitiesContainer />
              </Authenticate>
            }
          />
          <Route
            path=""
            element={
              <Authenticate>
                <ActivitiesContainer />
              </Authenticate>
            }
          />
          <Route
            path="edit/:activityId"
            element={
              <Authenticate>
                <EditActivity />
              </Authenticate>
            }
          />
          <Route
            path="messages"
            element={
              <Authenticate>
                <MessagesContainer />
              </Authenticate>
            }
          />
          <Route
            path="messages/conversation"
            element={
              <Authenticate>
                <Conversation />
              </Authenticate>
            }
          />
          <Route
            path="nutrition"
            element={
              <Authenticate>
                <NutritionContainer />
              </Authenticate>
            }
          />
          <Route
            path="nutrition/favourites"
            element={
              <Authenticate>
                <Favourites />
              </Authenticate>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
