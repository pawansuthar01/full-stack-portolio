import { useEffect, useState } from "react";
import AboutUpdater from "../../components/Admin/About";
import BannerUpdater from "../../components/Admin/banner";
import ContactList from "../../components/Admin/ContactList";
import EducationManager from "../../components/Admin/eduction";
import ProjectManager from "../../components/Admin/project";
import { Layout, User, XCircleIcon } from "lucide-react";
import { MdMenu, MdPassword, MdSettings } from "react-icons/md";
import SkillsChart from "../../components/Admin/skills";
import { FaBoxOpen } from "react-icons/fa6";
import {
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaGraduationCap,
  FaImage,
} from "react-icons/fa";
import { getAllData } from "../Redux/Slice/getData";
import { useDispatch } from "react-redux";
import SocialUpdate from "../../components/Admin/SociolLink";
import ChangePassword from "../../components/Admin/Password/changePassword";
import SubscribersList from "../../components/Admin/SubsrcibeUser";
const navigation = [
  {
    id: 1,
    label: "Banner Update",
    icon: FaImage,
    colors: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    label: "About Update",
    icon: FaUser,
    colors: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    label: "Skills Update",
    icon: FaTools,
    colors: "from-yellow-500 to-orange-500",
  },
  {
    id: 4,
    label: "project update",
    icon: FaProjectDiagram,
    colors: "from-green-500 to-orange-500",
  },
  {
    id: 5,
    label: "Education Update",
    icon: FaGraduationCap,
    colors: "from-red-500 to-pink-500",
  },
  {
    id: 6,
    label: "Messages",
    icon: FaEnvelope,
    colors: "from-purple-500 to-indigo-500",
  },
  {
    id: 7,
    label: "SociolLink Update",
    icon: MdSettings,
    colors: "from-green-500 to-indigo-500",
  },
  {
    id: 8,
    label: "Password Update",
    icon: MdPassword,
    colors: "from-green-500 to-indigo-500",
  },
  {
    id: 9,
    label: "Subscribe users",
    icon: User,
    colors: "from-green-500 to-indigo-500",
  },
];
const Admin = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        await dispatch(getAllData());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen p-5 flex w-full justify-center items-center bg-[#242424]">
        <div className="text-2xl font-bold w-24 h-24 border-2 rounded-full border-t-0 border-l-0 animate-spin transition-all duration-200 text-white"></div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden bg-[#242424] text-white">
      {/* Button Section */}

      <header className="bg-[#2a2a2a]  shadow-sm  z-40  w-full fixed ">
        <div className="max-w-8xl mx-auto  sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-20 ">
            <h1 className="text-xl font-bold text-cyan-600">Admin Dashboard</h1>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-[#00f7ff]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XCircleIcon className="h-8 w-8 cursor-pointer" />
              ) : (
                <MdMenu className="h-8 w-8 cursor-pointer" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigation.map((items) => (
                <button
                  key={items.id}
                  onClick={() => (
                    setActiveSection(items.id),
                    setIsMobileMenuOpen(!isMobileMenuOpen)
                  )}
                  className={`px-3 py-2 rounded-md text-sm font-bold  transition-colors duration-150 ease-in-out flex items-center ${
                    activeSection === items.id
                      ? "bg-cyan-500  text-white  cursor-pointer"
                      : "text-cyan-400 bg-gray-700 cursor-pointer"
                  }`}
                >
                  <items.icon className="w-4 h-4 mr-2 cursor-pointer" />

                  {items.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#242424] shadow-lg absolute w-full z-50">
            {navigation.map((items) => (
              <button
                key={items.id}
                onClick={() => (
                  setActiveSection(items.id),
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                )}
                className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${
                  activeSection === items.id
                    ? "bg-cyan-500  text-white cursor-pointer"
                    : "text-cyan-400 bg-gray-700 cursor-pointer"
                }`}
              >
                <items.icon className="w-4 h-4 mr-2 cursor-pointer" />

                {items.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      {activeSection == 1 && <BannerUpdater />}
      {activeSection == 2 && <AboutUpdater />}
      {activeSection == 3 && <SkillsChart />}
      {activeSection == 5 && <EducationManager />}
      {activeSection == 4 && <ProjectManager />}
      {activeSection == 6 && <ContactList />}
      {activeSection == 7 && <SocialUpdate />}
      {activeSection == 8 && <ChangePassword />}
      {activeSection == 9 && <SubscribersList />}
    </div>
  );
};

export default Admin;
