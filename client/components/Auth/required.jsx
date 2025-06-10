import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { AdminLogin } from "../../src/Redux/Slice/Admin";

const Required = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const { email, password } = useParams();

  useEffect(() => {
    const login = async () => {
      if (!email || !password) {
        setMessage("Missing credentials.");
        setLoading(false);
        return;
      }

      try {
        const res = await dispatch(AdminLogin({ email, password }));

        if (res?.payload?.success) {
          setIsAuthenticated(true);
          toast.success(res.payload.message);
        } else {
          setMessage(res?.payload?.message || "Login failed.");
          toast.error(res?.payload?.message);
        }
      } catch (error) {
        setMessage("Unexpected error during login.");
        toast.error("Login failed.");
      } finally {
        setLoading(false);
      }
    };

    login();
  }, [email, password, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen gap-5 flex flex-col items-center justify-center bg-[#242424]">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-white rounded-full animate-spin"></div>
        {message && (
          <div className="bg-[#abef] p-5 rounded-2xl m-5 max-[530px]:mx-10">
            <p className="text-red-500 text-sm">{message} Try again...</p>
          </div>
        )}
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default Required;
