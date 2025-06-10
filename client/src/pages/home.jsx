import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { About } from "../../components/About_section";
import Banner_section from "../../components/Banner_section";
import Contact from "../../components/Contect_section";
import Feedback from "../../components/feedback_section";
import Project from "../../components/Project_section";
import SkillsChart from "../../components/Skills_section";
import { Layout } from "../../layout/layout";
import { getAllData } from "../Redux/Slice/getData";
import getUserDetails from "../../utils/UserDetails";
import { ChatSimulation } from "../../components/ChatSimulation";
import ContactStrip from "../../components/contactStrip";
import BannerSkeleton from "../../components/skeleton/bannerSkeleton";
import AboutSkeleton from "../../components/skeleton/aboutSkeleton";
import SkillSkeleton from "../../components/skeleton/skillSkeleton";
import ProjectSkeleton from "../../components/skeleton/projectSkeleton";
import FeedbackSkeleton from "../../components/skeleton/feedbackSkeleton";
getUserDetails();
const Home = () => {
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
      <>
        <BannerSkeleton />
        <AboutSkeleton />
        <SkillSkeleton />
        <ProjectSkeleton />
        <FeedbackSkeleton />
      </>
    );
  }

  return (
    <Layout>
      <div className="overflow-hidden">
        <Banner_section />
        <About />
        <SkillsChart />
        <Project />
        <ChatSimulation />
        <Contact />
        <Feedback />
        <ContactStrip />
      </div>
    </Layout>
  );
};
export default Home;
