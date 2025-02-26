import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Layout } from "../../../layout/layout";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { UpdatePassword } from "../../../src/Redux/Slice/Admin";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [OldShowPassword, setOldShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!passwordData.oldPassword) {
      document.getElementById("oldPassword").style.borderColor = "red";
      return;
    }
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
    setError();
    const res = await dispatch(
      UpdatePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      })
    );

    setLoading(false);
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setSuccessMessage("password Successfully changed..");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    if (res?.payload?.message == "Old password does not match.") {
      document.getElementById("oldPassword").style.borderColor = "red";
      toast.error(res?.payload?.message);
    }
  };

  return (
    <div className=" flex h-screen ">
      <div className=" my-auto m-auto sm:w-[60%] w-[90%]  max-w-md p-6   border-cyan-200 border-1 rounded-md shadow-[0_0_5px_0_cyan]">
        <h2 className="text-xl font-semibold text-center mb-6">
          Reset Your Password
        </h2>

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type={OldShowPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              value={passwordData.oldPassword}
              onChange={handelUserInput}
              placeholder=" old Password"
              className="w-full p-3 border max-w-xs:text-sm outline-none border-cyan-300 rounded text-white"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setOldShowPassword((prev) => !prev)}
            >
              {OldShowPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handelUserInput}
              placeholder="new Password"
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
