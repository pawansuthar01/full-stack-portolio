import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changePassword,
  checkPasswordReset,
} from "../../../src/Redux/Slice/Admin";
import { EyeIcon, EyeOffIcon } from "lucide-react";
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [checkLoading, setCheckLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setResetToken(token);
  }, [token]);

  const handelUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    document.getElementById(name).style.borderColor = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    // Validate the passwords
    if (!passwordData.newPassword) {
      document.getElementById("newPassword").style.borderColor = "red";
      return;
    }
    if (!passwordData.confirmPassword) {
      document.getElementById("confirmPassword").style.borderColor = "red";
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      document.getElementById("newPassword").style.borderColor = "red";
      document.getElementById("confirmPassword").style.borderColor = "red";
      return;
    }

    setLoading(true);
    const newPassword = passwordData.newPassword;
    const res = await dispatch(changePassword({ resetToken, newPassword }));

    if (res?.payload?.success) {
      setSuccessMessage("password Successfully changed..");
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      });
    }
    if (!res?.payload?.success) {
      setError("Error Token does not exit or expiry, please try again");
    }

    setLoading(false);
  };
  useEffect(() => {
    async function passwordTokenCheck() {
      if (!resetToken) return;
      const res = await dispatch(checkPasswordReset(resetToken));

      if (res?.payload == undefined) return;
      if (res?.payload?.success) {
        setCheckLoading(false);
        setError(false);
        return;
      }
      if (!res?.payload?.success) {
        setCheckLoading(false);

        setError("Error Token does not exit or expiry, please try again");
        return;
      }
      setCheckLoading(false);
    }
    if (checkLoading) {
      passwordTokenCheck();
    }
  }, [resetToken]);
  if (checkLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424]">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin">
          {" "}
        </div>
        Loading...
      </div>
    );
  }
  return (
    <div className=" flex h-screen bg-[#242424]">
      <div className=" my-auto m-auto sm:w-[60%] w-[90%] max-w-md p-6 bg-[#2a2828]  border-cyan-200 border-1 rounded-md shadow-[0_0_5px_0_cyan]">
        <h2 className="text-xl text-white font-semibold text-center mb-6">
          Reset Your Password
        </h2>

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handelUserInput}
              placeholder="Password"
              className="w-full p-3 border max-w-xs:text-sm outline-none border-cyan-300 rounded text-white"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-6 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handelUserInput}
              placeholder="Confirm Password"
              className="w-full p-3 border max-w-xs:text-sm  pr-10 outline-none border-cyan-300 rounded text-white"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
              disabled={error || loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
