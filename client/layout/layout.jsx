import { useDispatch } from "react-redux";
import Footer from "../components/Layout/footer";
import Navbar from "../components/Layout/Nav";
import { useEffect } from "react";
import { GetAllMessage } from "../src/Redux/Slice/Admin";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      const res = await dispatch(GetAllMessage());
      console.log(res);
    }
    getData();
  }, []);
  return (
    <div className="bg-[#242424]  text-white min-h-screen">
      <Navbar />
      <main className="lg:pt-0 sm:pt-28  pt-12">
        {children}
        <Footer />
      </main>
    </div>
  );
};
