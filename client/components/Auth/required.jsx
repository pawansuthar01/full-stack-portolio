import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { AdminLogin } from "../../src/Redux/Slice/Admin";
// import { Admin } from "../redux/actions/authActions"; // Import your action correctly

function Required() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const { email, password } = useParams();

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    setLoading(true);

    const res = await dispatch(AdminLogin({ email, password }));

    console.log(res);
    if (res?.payload?.success) {
      setLoading(false);
      toast.success(res?.payload?.message);
      setIsAuthenticated(true);
    } else {
      toast.error(res?.payload?.message);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [email, password]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#242424]">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default Required;
