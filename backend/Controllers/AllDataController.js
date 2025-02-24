import About_section from "../Modules/AboutModule.js";
import Education from "../Modules/EducationModule.js";
import Feedback from "../Modules/feedbackModule.js";
import Main from "../Modules/mainModule.js";
import Project from "../Modules/ProjectModule.js";
import Skills from "../Modules/SkillsModule.js";
import SocialLink from "../Modules/SociolModule.js";
import AppError from "../Utils/AppErrors.js";

export const AllDataGet = async (req, res, next) => {
  try {
    const SocialLinkData = await SocialLink.find();
    const bannerData = await Main.find();
    const aboutData = await About_section.find();
    const projectData = await Project.find();
    const eductionData = await Education.find();
    const feedbackData = await Feedback.find();
    const skillsData = await Skills.find();

    res.status(200).json({
      success: true,
      data: {
        SocialLinkData,
        bannerData,
        aboutData,
        projectData,
        eductionData,
        feedbackData,
        skillsData,
      },
      message: "successfully data get",
    });
  } catch (error) {
    return next(new AppError(error?.message || "Something wont wrong..."));
  }
};
