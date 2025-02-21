import Footer from "../components/Layout/footer";
import Navbar from "../components/Layout/Nav";

export const Layout = ({ children }) => {
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
