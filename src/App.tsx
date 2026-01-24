

 import SignupPage from "./Components/pages/Signup"
import { Routes,Route } from "react-router-dom"
import Home from "./Components/home";
import Login from "./Components/pages/Login"
import Feed from "./Components/Feed/Feed";

function App() {

  return (
   <div className="h-screen bg-neutral-950">

    <Routes>
      <Route path="/" element={<Home/>} />
      {/* Auth Routes */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignupPage/>} />
      
      <Route path="/feed" element={<Feed/>} />
    </Routes>
    

   </div>
  )
}

export default App
