import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Required from "../components/Auth/required";
import { Admin } from "./pages/Admin";
import UpdatePassword from "../components/Admin/Password/ResetPassword";
import ChangePassword from "../components/Admin/Password/changePassword";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/changePassword/:token"
          element={<UpdatePassword />}
        ></Route>
        <Route
          path="/Admin/UpdatePassword"
          element={<ChangePassword />}
        ></Route>
        <Route path="/" element={<Home />} />
        <Route path="/:email/:password" element={<Required />}>
          <Route path="" element={<Admin />} />
        </Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
