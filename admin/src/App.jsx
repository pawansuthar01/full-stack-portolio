import { Routes, Route, Navigate } from "react-router-dom";

// Layout & Guard
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Messages from "./pages/Messages";
import Skills from "./pages/Skills";
import SocialLinks from "./pages/SocialLinks";
import Subscriptions from "./pages/Subscriptions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="messages" element={<Messages />} />
        <Route path="skills" element={<Skills />} />
        <Route path="social-links" element={<SocialLinks />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
