import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Required from "../components/Auth/required";
import Admin from "./pages/Admin";
import UpdatePassword from "../components/Admin/Password/ResetPassword";
import ChangePassword from "../components/Admin/Password/changePassword";
import NotFoundPage from "./pages/NotFound";
import CustomCursor from "../components/ui/customCursor";
import AboutPage from "./pages/About";
import Projects from "./pages/projects";
import ContactPage from "./pages/contactPage";
import FeedbackAddPage from "./pages/feedbackAddPage";

function App() {
  return (
    <div className="min-h-screen  bg-gray-900 overflow-x-hidden">
      <CustomCursor />

      <Routes>
        {/* Layout with nested routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/feedback/add" element={<FeedbackAddPage />} />

        {/* Password reset routes */}
        <Route path="/changePassword/:token" element={<UpdatePassword />} />
        <Route path="/Admin/UpdatePassword" element={<ChangePassword />} />

        {/* Admin protected route */}
        <Route path="/:email/:password" element={<Required />}>
          <Route index element={<Admin />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
