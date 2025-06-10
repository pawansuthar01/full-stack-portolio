import Footer from "../components/Layout/footer";
import Navbar from "../components/Layout/Nav";

export const Layout = ({ children }) => {
  return (
    <div className="  text-white min-h-screen">
      <Navbar />
      <main className="">
        {children}
        <Footer />
      </main>
    </div>
  );
};
