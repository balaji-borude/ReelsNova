import Signup from "./Components/pages/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/pages/Login";
import Feed from "./Components/Feed/Feed";
import MainLayout from "./Components/layout/MainLayout";
import UploadForm from "./Components/Upload/UploadForm";
import PrivateRoute from "./Components/shared/PrivateRoute";
import PublicRoute from "./Components/shared/PublicRoute";
import Profile from "./Components/profile/Profile";
import EditProfile from "./Components/profile/edit/EditProfile";
import Message from "./Components/message/Message";
import Settings from "./Components/settings/Settings";
import Activity from "./Components/Activity/Activity";
import Saved from "./Components/Saved/Saved";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <UploadForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/message"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          />

          <Route
            path="/messages/:id"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          <Route
            path="/activity"
            element={
              <PrivateRoute>
                <Activity />
              </PrivateRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <PrivateRoute>
                <Saved />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
