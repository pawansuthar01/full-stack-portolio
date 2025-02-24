import { Outlet, Navigate, useParams } from "react-router-dom";

function Required() {
  const password = "12345678"; // Ensure it's a string
  const { id } = useParams(); // Capture URL param

  return id === password ? <Outlet /> : <Navigate to="/" />;
}

export default Required;
