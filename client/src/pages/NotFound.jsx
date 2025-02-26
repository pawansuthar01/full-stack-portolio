import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-800">
      <h1 className="font-extrabold text-9xl text-white  tracking-widest">
        404
      </h1>
      <div className=" absolute bg-black px-3 rounded-sm text-white rotate-12 mb-5">
        Page not Found...
      </div>
      <button className="mt-5">
        <a className=" relative inline-block text-sm  font-medium text-[#FF6A3D]  group active:text-yellow-500  focus:outline-none focus:ring ">
          <span
            onClick={() => navigate(-1)}
            className=" relative block px-8 py-3 bg-[#1a2238] border border-current"
          >
            Go back
          </span>
        </a>
      </button>
    </div>
  );
}
export default NotFoundPage;
