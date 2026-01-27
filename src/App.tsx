

 import SignupPage from "./Components/pages/Signup"
import { Routes,Route } from "react-router-dom"
import Home from "./Components/home";
import Login from "./Components/pages/Login"
import Feed from "./Components/Feed/Feed";
import MainLayout from "./Components/layout/MainLayout";

function App() {

  return (
    //  bg-neutral-950
   <div>

    <Routes>

      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignupPage/>} />
        
        {/* Do Private route here --create dashboard for profile , settings, etc pages  */}
        <Route path="/feed" element={<Feed/>} />
      </Route>
    </Routes>
    

   </div>
  )
}

export default App
