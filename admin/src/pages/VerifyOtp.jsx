import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  verifyOTP,
  resendOTP,
  clearError,
  setResendCooldown,
  CheckEmail,
} from "../features/auth/authSlice";
import { Shield, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, resendCooldown } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (resendCooldown > 0) {
      setCountdown(resendCooldown);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            dispatch(setResendCooldown(0));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    const email = localStorage.getItem("otpEmail");
    dispatch(CheckEmail());
    if (!email) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const result = await dispatch(verifyOTP({ email, otp }));
      if (result.type === "auth/verifyOTP/fulfilled") {
        toast.success("Login successful!");
        localStorage.removeItem("otpEmail");
      }
    } catch (err) {
      toast.error("OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    dispatch(CheckEmail());
    const email = localStorage.getItem("otpEmail");

    if (!email || email == "undefined") {
      localStorage.setItem("otpSent", false);
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const result = await dispatch(resendOTP({ email }));
      if (result.type === "auth/resendOTP/fulfilled") {
        toast.success("OTP resent successfully!");
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-500 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 text-center"
            >
              Verification Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="block w-full px-3 py-3 text-center text-2xl font-mono tracking-widest border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="000000"
                maxLength={6}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={countdown > 0 || isLoading}
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
