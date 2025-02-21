import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Required from "../components/Auth/required";
import { Admin } from "./pages/Admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin/:id" element={<Required />}>
          <Route path="" element={<Admin />} />
        </Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
