import { AboutSection } from "./Components/home/AboutSection"
import { HeroSection } from "./Components/home/HeroSection"
import { PreviewFeedSection } from "./Components/home/PreviewFeedSection"
import { Footer } from "./Components/layout/Footer"
import { Navbar } from "./Components/layout/Navbar"
// import Login from "./Components/pages/Login"
// import SignupPage from "./Components/pages/Signup"


function App() {

  return (
   <div className="h-screen bg-neutral-950">
    <Navbar/>
    <HeroSection/>
    <PreviewFeedSection/>
    <AboutSection/>
    <Footer/>

    {/* <Login/>
    <SignupPage/> */}
   </div>
  )
}

export default App
