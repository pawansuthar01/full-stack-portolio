import AppError from "../Utils/AppErrors.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import Project from "../Modules/ProjectModule.js";
import sendEmail from "../Utils/EmailSender.js";
import Subscribe from "../Modules/subscribeModule.js";
import * as dotenv from "dotenv";
dotenv.config();
//*new project add//*
export const NewProjectAdd = async (req, res, next) => {
  const { title, category, description, liveUrl, githubUrl, tags, featured } =
    req.body;

  if (!title || !description || !tags || !req.file || !category | !liveUrl) {
    return next(
      new AppError("please give All filed to Add new project...", 400)
    );
  }
  let image = "default-image-url";

  try {
    if (req.file) {
      const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "projectImage",
      });
      if (uploadedImage) {
        image = uploadedImage.secure_url;
      }
      await fs.rm(req.file.path, { force: true });
    }
    const newProject = new Project({
      tags,

      image,

      title,
      category,
      description,
      liveUrl,
      githubUrl,
      featured,
    });
    if (!newProject) {
      return next(
        new AppError("something want wrong while upload project", 400)
      );
    }
    await newProject.save();

    const Subject = "🎉 New Project Uploaded Successfully!";
    const Message = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #e0f7fa; padding: 20px; border-radius: 8px; border: 1px solid #00bcd4;">
        <h2 style="color: #00796b; text-align: center;">🚀 New Project Uploaded!</h2>
        
        <p>Dear <strong>${"Subscriber"}</strong>,</p>
        <p>Congratulations! Your project has been successfully uploaded to your portfolio.</p>
    
        <h3 style="color: #004d40;">📌 Project Details:</h3>
        <ul>
          <li><strong>Project ID:</strong> ${newProject._id}</li>
          <li><strong>Project Name:</strong> ${newProject.title}</li>
          <li><strong>Uploaded On:</strong> ${new Date().toLocaleDateString()}</li>
        </ul>
    
        <p>You can view your project by clicking the button below:</p>
        
        <p style="text-align: center;">
          <a href="${
            process.env.FRONTEND_URL
          }" style="background-color: #00796b; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px;">
            🔗 View Project
          </a>
        </p>
    
        <p>If you have any questions, feel free to contact us at 
          <a href="mailto:${process.env.EMAIL}" style="color: #00796b;">${
      process.env.EMAIL
    }</a>.
        </p>
    
        <hr style="border: none; border-top: 1px solid #00bcd4; margin: 20px 0;">
    
        <p>Best regards,<br><strong>Pawan Kumar 🚀</strong></p>
      </div>
    `;

    res.status(200).json({
      success: true,
      message: "Project add SuccessFully...",
      data: newProject,
    });
    try {
      const subscribers = await Subscribe.find({}).select("email");

      // await Promise.all(
      //   subscribers.map((user) => sendEmail(user.email, Subject, Message))
      // );
    } catch (error) {
      return next(new AppError(error.message, 400));
    }
  } catch (error) {
    if (req.file.path) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};

//* updated project//*
export const updateProjectById = async (req, res, next) => {
  const { id } = req.params;

  const { title, category, description, liveUrl, githubUrl, tags, featured } =
    req.body;

  if (!id) {
    return next(new AppError("please give id to   update project...", 400));
  }
  let image;
  try {
    if (req.file) {
      try {
        const uploadedImage = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "projectImage",
          }
        );
        if (uploadedImage) {
          image = uploadedImage.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }

    const newData = {
      ...(title && { title }),
      ...(tags && { tags }),
      ...(liveUrl && { liveUrl }),
      ...(req.file && { image }),
      ...(description && { description }),
      ...(category && { category }),
      ...(githubUrl && { githubUrl }),
      ...(featured && { featured }),
    };
    const updatedProjectData = await Project.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedProjectData) {
      return next(
        new AppError("something want wrong while update project", 400)
      );
    }
    await updatedProjectData.save();

    const Subject = "🔄 Project Updated Successfully!";
    const Message = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #e0f7fa; padding: 20px; border-radius: 8px; border: 1px solid #00bcd4;">
        <h2 style="color: #00796b; text-align: center;">🔄 Project Updated Successfully!</h2>
        
        <p>Dear <strong>${"subscriber"}</strong>,</p>
        <p>We wanted to let you know that your project has been successfully updated.</p>
    
        <h3 style="color: #004d40;">📌 Updated Project Details:</h3>
        <ul>
          <li><strong>Project ID:</strong> ${updatedProjectData._id}</li>
          <li><strong>Project Name:</strong> ${updatedProjectData.title}</li>
          <li><strong>Updated On:</strong> ${new Date().toLocaleDateString()}</li>
        </ul>
    
        <p>You can view your updated project by clicking the button below:</p>
        
        <p style="text-align: center;">
          <a href="${
            process.env.FRONTEND_URL
          }" style="background-color: #00796b; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px;">
            🔗 View Updated Project
          </a>
        </p>
    
        <p>If you have any concerns, feel free to reach out at 
          <a href="mailto:${process.env.EMAIL}" style="color: #00796b;">${
      process.env.EMAIL
    }</a>.
        </p>
    
        <hr style="border: none; border-top: 1px solid #00bcd4; margin: 20px 0;">
    
        <p>Best regards,<br><strong>Pawan Kumar 🚀</strong></p>
      </div>
    `;

    res.status(200).json({
      success: true,
      message: "Project update SuccessFully...",
      data: updatedProjectData,
    });
    try {
      const subscribers = await Subscribe.find({}).select("email");

      // await Promise.all(
      //   subscribers.map((user) => sendEmail(user.email, Subject, Message))
      // );
    } catch (error) {
      return next(new AppError(error.message, 400));
    }
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const ProjectDeleteById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError(" id required to delete project", 400));
  }
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successFully Delete Project...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const AllGetProject = async (req, res, next) => {
  try {
    const projectData = await Project.find({}, { feedbackList: 0 });

    const CountTotalProject = await Project.countDocuments();
    if (!projectData) {
      return next(
        new AppError("All project dote`s not found,try again...", 400)
      );
    }
    res.status(200).json({
      Count: CountTotalProject,
      success: true,
      message: "successFully get All project",
      data: projectData,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const GetProjectById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("id required to Get project...", 400));
  }

  try {
    const GetProject = await Project.findById(id);
    if (!GetProject) {
      return next(new AppError("project dote`s not found,try again...", 400));
    }
    res.status(200).json({
      success: true,
      message: "successFully get  project",
      data: GetProject,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const projectFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("id required to Get project...", 400));
    }

    const { rating, comment, fullName } = req.body;
    if (!rating || !comment || !fullName) {
      return next(new AppError("please give ratting and comment...", 400));
    }
    const feedback = {
      fullName,

      comment,
      rating,
    };
    const projectFeedbackAdd = await Project.findByIdAndUpdate(
      id,
      { $set: { feedbackList: feedback } },
      { new: true, runValidators: true }
    );

    if (!projectFeedbackAdd) {
      return next(new AppError("something wont wrong , try next time...", 400));
    }
    await projectFeedbackAdd.save();
    res.status(200).json({
      success: true,
      message: "successfully submit  project feedback...",
      data: projectFeedbackAdd,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const updateProjectFeedback = async (req, res, next) => {
  try {
    const { projectId, feedbackId } = req.params;

    const { comment, fullName, rating } = req.body;

    if (!projectId || !feedbackId) {
      return next(
        new AppError("please give id for update project feedback...", 400)
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, "feedbackList._id": feedbackId },
      {
        $set: {
          "feedbackList.$.comment": comment,

          "feedbackList.$.fullName": fullName,
          "feedbackList.$.rating": rating,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return next(new AppError("Feedback not found or update failed.", 404));
    }

    await updatedProject.save();
    res.status(200).json({
      success: true,
      message: "successfully update project feedback...",
      data: updatedProject,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const DeleteFeedbackById = async (req, res, next) => {
  try {
    const { projectId, feedbackId } = req.params;

    if (!projectId || !feedbackId) {
      return next(
        new AppError("please give id for update project feedback...", 400)
      );
    }

    await Project.findOneAndDelete({
      _id: projectId,
      "feedbackList._id": feedbackId,
    });

    res.status(200).json({
      success: true,
      message: "successFully Delete feedback project...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const getAllFeedback = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const projects = await Project.find({}, { feedbackList: 1, _id: 0 });

    const allFeedbacks = projects.flatMap((project) => project.feedbackList);

    const paginatedFeedbacks = allFeedbacks.slice(skip, skip + parseInt(limit));

    const happyCustomers = allFeedbacks.filter((fb) => fb.rating >= 3).length;

    res.status(200).json({
      success: true,
      message: "Successfully fetched feedback...",
      data: paginatedFeedbacks,
      totalPage: Math.ceil(allFeedbacks.length / limit),
      countFeedback: allFeedbacks.length,
      happyCustomers,
      currentPage: parseInt(page),
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
