import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-950">
        {/* fixed position */}
      <Navbar />

      {/* Nested Routes */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
