
import { Navbar } from "../layout/Navbar";
import { HeroSection } from "./HeroSection";
import { PreviewFeedSection } from "./PreviewFeedSection";
import { AboutSection } from "./AboutSection";
import { Footer } from "../layout/Footer";

const Home = () => {
  return (
    <div className="h-screen bg-neutral-950">
      <Navbar />
      <HeroSection />
      <PreviewFeedSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
