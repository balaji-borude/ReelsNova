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


function App() {
  return (
  
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

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



        </Route>


      </Routes>
    </div>
  );
}

export default App;
