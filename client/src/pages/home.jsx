import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { About } from "../../components/About_section";
import Banner_section from "../../components/Banner_section";
import Contact from "../../components/Contect_section";
import EducationCard from "../../components/Eudcation_section";
import Feedback from "../../components/feedback_section";
import Project from "../../components/Project_section";
import SkillsChart from "../../components/Skills_section";
import { Layout } from "../../layout/layout";
import { getAllData } from "../Redux/Slice/getData";

export default function Home() {
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
