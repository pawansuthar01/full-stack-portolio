import cloudinary from "cloudinary";
import fs from "fs/promises";
import AppError from "../Utils/AppErrors.js";
import Education from "../Modules/EducationModule.js";
export const AddEductionCart = async (req, res, next) => {
  try {
    const { name, DateOfComplete, NameOfBoard, totalPercent, description } =
      req.body;

    if (
      !name ||
      !description ||
      !DateOfComplete ||
      !totalPercent ||
      !NameOfBoard ||
      !req.file
    ) {
      return next(new AppError("All filed is required to Add Education", 400));
    }
    let image;
    if (req.file) {
      const uploadImage = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "educationImage",
      });
      if (uploadImage) {
        image = uploadImage.secure_url;
      }
      await fs.rm(req.file.path, { force: true });
    }
    const NewEduction = new Education({
      name,
      description,
      NameOfBoard,
      DateOfComplete,
      image,
      totalPercent,
    });
    if (!NewEduction) {
      return next(new AppError("error to upload education cart...", 400));
    }
    await NewEduction.save();
    res.status(200).json({
      success: true,
      message: "successfully upload eduction cart",
      data: NewEduction,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const updatedEductionCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("ID is required to update education", 400));
    }

    const { name, DateOfComplete, NameOfBoard, totalPercent, description } =
      req.body;

    let image;
    if (req.file) {
      try {
        const uploadImage = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "educationImage",
        });
        image = uploadImage.secure_url;
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }

    const updatedData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(DateOfComplete && { DateOfComplete }),
      ...(NameOfBoard && { NameOfBoard }),
      ...(req.file && { image }),
      ...(totalPercent && { totalPercent }),
    };

    const updatedEducationCart = await Education.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedEducationCart) {
      return next(
        new AppError("Something went wrong while updating education cart", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated education cart",
      data: updatedEducationCart,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const AllEductionCart = async (req, res, next) => {
  try {
    const allEductionCart = await Education.find();
    const EducationCartCount = await Education.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully Get All education...",
      data: allEductionCart,
      count: EducationCartCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteEducationCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("ID is required to Delete education", 400));
    }
    await Education.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully Delete  education...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
