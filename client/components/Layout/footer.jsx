import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Subscribe } from "../../src/Redux/Slice/UserSlice";
import { isEmail } from "../../Helper/Regex";
import LoadingButton from "../../constants/LoadingButton";
export default function Footer() {
  const { SocialLinkData } = useSelector((state) => state?.DataStore);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handelInput = (e) => {
    setMessage(false);
    setSuccess(false);
    const { name, value } = e.target;
    setEmail(value);

    document.getElementById("subscribeEmail").style.borderColor = "";
  };
  const handelSubscribe = async (e) => {
    setMessage(false);
    setSuccess(false);
    e.preventDefault();
    if (!email) {
      document.getElementById("subscribeEmail").style.borderColor = "red";
      return;
    }
    if (!isEmail(email)) {
      document.getElementById("subscribeEmail").style.borderColor = "red";
      return;
    }
    setLoading(true);
    const res = await dispatch(Subscribe(email));
    setLoading(false);
    setEmail("");
    setMessage(res?.payload?.message);
    setSuccess(res?.payload?.success);
    setTimeout(() => {
      setMessage(false);
      setSuccess(false);
    }, 2000);
  };
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#1b1b1b]/20   text-center   lg:p-5">
      <div className="mt-6">
        {message && (
          <p
            className={`${
              success ? "text-cyan-300" : "text-red-500"
            } p-2 text-sm`}
          >
            {message}
          </p>
        )}
      </div>

      <div className=" w-full  justify-center flex md:justify-end">
        <form
          onSubmit={handelSubscribe}
          className="flex items-center max-[320px]:flex-col  gap-2 space-x-3  p-3 rounded-lg"
        >
          <input
            type="email"
            id="subscribeEmail"
            name="email"
            value={email}
            onChange={handelInput}
            placeholder="Enter your email"
            className="p-2 rounded-md  text-white border border-cyan-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            textSize={"px-4 py-2 "}
            name={"Subscribe"}
            message={"Loading..."}
            width={"w-auto"}
            color={
              "bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
            }
          />
        </form>
      </div>
      <div className="flex justify-center gap-5 mt-6">
        <a
          href={SocialLinkData[0]?.facebook || "https://www.facebook.com"}
          target="_blank"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href={SocialLinkData[0]?.Instagram}
          target="_blank"
          className="text-red-500 dark:text-red-400 hover:text-red-700"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href={SocialLinkData[0]?.x}
          target="_blank"
          className="text-gray-800 dark:text-gray-300 hover:text-gray-600"
        >
          <FaXTwitter size={24} />
        </a>
        <a
          href={SocialLinkData[0]?.linkedin}
          target="_blank"
          className="text-blue-500 dark:text-blue-300 hover:text-blue-700"
        >
          <FaLinkedinIn size={24} />
        </a>
      </div>
      <p className="mt-1"> ©{year} Pawan Suthar. All rights reserved.</p>
    </footer>
  );
}
