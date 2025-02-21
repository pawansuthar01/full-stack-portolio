import { useState } from "react";
import AboutUpdater from "../../components/Admin/About";
import BannerUpdater from "../../components/Admin/banner";
import ContactList from "../../components/Admin/ContactList";
import EducationManager from "../../components/Admin/eduction";
import ProjectManager from "../../components/Admin/project";
import { Layout } from "lucide-react";
import SkillsChart from "../../components/Admin/skills";
export const Admin = () => {
  const [Active, setActive] = useState(0);
  return (
    <div className="overflow-hidden bg-[#242424] text-white">
      <nav className="bg-[#2a2a2a] p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <Layout className="text-blue-500" size={24} />
          <button
            onClick={() => setActive(0)}
            className={`${
              Active == 0 ? "text-cyan-300" : "text-white"
            } hover:text-cyan-400 transition-colors`}
          >
            Banner Updater
          </button>
          <button
            onClick={() => setActive(1)}
            className={`${
              Active == 1 ? "text-cyan-300" : "text-white"
            } hover:text-cyan-400 transition-colors`}
          >
            AboutUpdater
          </button>
          <button
            onClick={() => setActive(2)}
            className={`${
              Active == 2 ? "text-cyan-300" : "text-white"
            } hover:text-cyan-400 transition-colors`}
          >
            ProjectManager
          </button>
          <button
            onClick={() => setActive(3)}
            className={`${
              Active == 3 ? "text-cyan-300" : "text-white"
            } hover:text-cyan-400 transition-colors`}
          >
            EducationManager
          </button>
          <button
            onClick={() => setActive(4)}
            className={`${
              Active == 4 ? "text-cyan-300" : "text-white"
            } hover:text-cyan-400 transition-colors`}
          >
            SkillsChart
          </button>
          <button
            onClick={() => setActive(5)}
            className={`${
              Active == 5 ? "text-cyan-300" : "text-white"
            } hover:text-cyan-400 transition-colors`}
          >
            messages
          </button>
        </div>
      </nav>
      {Active == 0 && <BannerUpdater />}
      {Active == 1 && <AboutUpdater />}
      {Active == 2 && <ProjectManager />}
      {Active == 3 && <EducationManager />}
      {Active == 4 && <SkillsChart />}
      {Active == 5 && <ContactList />}
    </div>
  );
};
