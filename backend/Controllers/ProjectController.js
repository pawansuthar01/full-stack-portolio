import AppError from "../Utils/AppErrors.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import Project from "../Modules/ProjectModule.js";

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
