import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full   text-center   p-5">
      <div className="mt-6 w-full justify-center flex md:justify-end">
        <form className="flex items-center space-x-3  p-3 rounded-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md  text-white border border-cyan-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="flex justify-center gap-5 mt-6">
        <a
          href="#"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
          whileHover={{ scale: 1.2 }}
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="#"
          className="text-red-500 dark:text-red-400 hover:text-red-700"
          whileHover={{ scale: 1.2 }}
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="#"
          className="text-gray-800 dark:text-gray-300 hover:text-gray-600"
          whileHover={{ scale: 1.2 }}
        >
          <FaXTwitter size={24} />
        </a>
        <a
          href="#"
          className="text-blue-500 dark:text-blue-300 hover:text-blue-700"
          whileHover={{ scale: 1.2 }}
        >
          <FaLinkedinIn size={24} />
        </a>
      </div>
      <p className="mt-1"> ©{year} Pawan Suthar. All rights reserved.</p>
    </footer>
  );
}
