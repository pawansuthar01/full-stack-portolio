import About from "../../components/About_section";
import Banner_section from "../../components/Banner_section";
import EducationCard from "../../components/Eudcation_section";
import Project from "../../components/Project_section";
import SkillsChart from "../../components/Skills_section";
import { Layout } from "../../layout/layout";

export default function Home() {
  return (
    <Layout>
      <Banner_section />
      <About />
      <SkillsChart />
      <Project />
      <EducationCard />
    </Layout>
  );
}
