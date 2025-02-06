import AppError from "../Utils/AppErrors.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import Project from "../Modules/ProjectModule.js";
import User from "../Modules/UserModule.js";
import sendEmail from "../Utils/SendEmail.js";
import Notification from "../Modules/NotificationModule.js";

//*new project add//*
export const NewProjectAdd = async (req, res, next) => {
  const { title, description, tags } = req.body;

  if (!title || !description || !tags || !req.file) {
    return next(
      new AppError("please give All filed to Add new project...", 400)
    );
  }

  let image = "few time valid..";
  let tagsArray;
  try {
    const parsedTags = JSON.parse(tags);
    if (!Array.isArray(parsedTags)) {
      return next(new AppError("Tags must be an array.", 400));
    }

    // Convert array of strings to array of objects with name field
    tagsArray = parsedTags.map((tag) => ({ name: tag }));
  } catch (error) {
    return next(
      new AppError("Invalid tags format. Must be an array of strings.", 400)
    );
  }
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
      title,
      tags: tagsArray,
      image,
      description,
    });
    if (!newProject) {
      return next(
        new AppError("something want wrong while upload project", 400)
      );
    }
    await newProject.save();
    const users = await User.find({}, "email _id");
    const path = process.env.FRONTEND_URL;
    const projectViewUrl = `${path}/project:${newProject._id}`;

    const notifications = users.map((user) => ({
      userId: user._id,
      message: `A new project has been uploaded , Please review the project details.`,
      DataUrl: projectViewUrl,
      type: "New Project",
    }));
    await Notification.insertMany(notifications);

    const subject = "🚀 New Project Uploaded Successfully!";

    const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #4CAF50; text-align: center;">🎉 New Project Uploaded Successfully!</h2>
  
      
      <p>We’re excited to inform you that your project has been uploaded successfully to your portfolio.</p>
  
      <h3 style="color: #333;">📌 Project Details:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Project ID:</strong> ${newProject._id}</li>
        <li><strong>Project Name:</strong> ${newProject.title}</li>
        <li><strong>Uploaded On:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>
  
      <p>You can view your project by clicking the button below:</p>
  
      <p style="text-align: center;">
        <a href="${projectViewUrl}" 
           style="color: #ffffff; background-color: #4CAF50; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
           View Project
        </a>
      </p>
  
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-word;">${projectViewUrl}</p>
  
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
      <p>If you have any questions, feel free to reach out at 
        <a href="mailto:${process.env.EMAIL}" style="color: #4CAF50;">${
      process.env.EMAIL
    }</a>.
      </p>
  
      <p>Thank you for trusting us with your projects!</p>
      <p style="font-weight: bold;">Best regards,<br>Pawan Kumar 🚀</p>
    </div>
  `;

    for (const user of users) {
      await sendEmail(user.email, subject, message);
    }

    res.status(200).json({
      success: true,
      message: "Project add SuccessFully...",
      data: newProject,
    });
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

  const { title, description, tags } = req.body;
  let tagsArray;
  if (tags) {
    try {
      const parsedTags = JSON.parse(tags);
      if (!Array.isArray(parsedTags)) {
        return next(new AppError("Tags must be an array.", 400));
      }

      tagsArray = parsedTags.map((tag) => ({ name: tag }));
    } catch (error) {
      return next(
        new AppError("Invalid tags format. Must be an array of strings.", 400)
      );
    }
  }
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
      ...(tags && { tags: tagsArray }),
      ...(req.file && { image }),
      ...(description && { description }),
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
    res.status(200).json({
      success: true,
      message: "Project update SuccessFully...",
      data: updatedProjectData,
    });
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
    const AllProject = await Project.find({}, { feedbackList: 0 });

    const CountTotalProject = await Project.countDocuments();
    if (!AllProject) {
      return next(
        new AppError("All project dote`s not found,try again...", 400)
      );
    }
    res.status(200).json({
      Count: CountTotalProject,
      success: true,
      message: "successFully get All project",
      data: AllProject,
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
    const { fullName } = req.user;

    const { rating, comment, avatar } = req.body;
    if (!rating || !comment) {
      return next(new AppError("please give ratting and comment...", 400));
    }
    const feedback = {
      fullName,
      avatar,
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

    const { comment, avatar, fullName, rating } = req.body;

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
          "feedbackList.$.avatar": avatar,
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

export const LikeProjectById = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  if (!userId) {
    return next(new AppError("userId is required.", 400));
  }

  if (!id) {
    return next(new AppError("project id is required.", 400));
  }
  try {
    const project = await Project.findOne({ _id: id });

    if (!project) {
      return next(new AppError("project not found.", 400));
    }
    const likeIndex = project.projectLikes.findIndex(
      (like) => like.userId === userId
    );
    if (likeIndex !== -1) {
      if (project.projectLikes[likeIndex].projectLike === true) {
        project.projectLikes.splice(likeIndex, 1);
      } else {
        project.projectLikes[likeIndex].projectLike === true;
      }
    } else {
      project.projectLikes.push({ projectLike: true, userId: userId });
    }
    project.likeCount = project.projectLikes.filter(
      (like) => like.projectLike === true
    ).length;
    await project.save();
    res.status(200).json({
      success: true,
      data: project,
      message: "Product successfully liked or disliked.",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const AddFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { userId, fullName } = req.user;
  if (!userId || !fullName) {
    return next(new AppError("userId is required.", 400));
  }

  if (!id) {
    return next(new AppError("project id is required.", 400));
  }
  try {
    const project = await Project.findById(id);
    if (!project) {
      return next(new AppError("project not found.", 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    const projectExist = user.favoriteList.some(
      (project) => project.projectId && project.projectId.toString() === id
    );
    if (projectExist) {
      return next(new AppError("project is already in the favorite...", 400));
    }
    user.favoriteList.push({ projectId: id });
    await user.save();
    project.favoriteList.push({ userId: userId, fullName: fullName });
    await project.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "project successfully added to favorite list.",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const removeToFavoriteList = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  if (!userId) {
    return next(new AppError("userId is required.", 400));
  }

  if (!id) {
    return next(new AppError("project id is required.", 400));
  }
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: { favoriteList: { projectId: id } },
      },

      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    await user.save();
    const project = await Project.findByIdAndUpdate(
      id,
      { $pull: { favoriteList: { userId: userId } } },
      {
        new: true,
        runValidators: true,
      }
    );

    await project.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "project successfully remove to favorite list.",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
