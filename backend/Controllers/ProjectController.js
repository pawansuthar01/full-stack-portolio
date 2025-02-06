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
    const AllProject = await Project.find();
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
