import About from "../../components/About_section";
import Banner_section from "../../components/Banner_section";
import Contact from "../../components/Contect_section";
import EducationCard from "../../components/Eudcation_section";
import Feedback from "../../components/feedback_section";
import Project from "../../components/Project_section";
import SkillsChart from "../../components/Skills_section";
import { Layout } from "../../layout/layout";

export default function Home() {
  return (
    <Layout>
      <div className="overflow-hidden">
        <Banner_section />
        <About />
        <SkillsChart />
        <Project />
        <EducationCard />
        <Contact />
        <Feedback />
      </div>
    </Layout>
  );
}
