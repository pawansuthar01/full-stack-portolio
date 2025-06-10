import AppError from "../Utils/AppErrors.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import Main from "../Modules/mainModule.js";

//* uploadMainSectionDetails//*
export const MainDetailsCreate = async (req, res, next) => {
  const { title, smallDescription, description, name } = req.body;
  if (!title || !smallDescription || !description || !name || !req.file) {
    return next(new AppError("please give All Data  ", 400));
  }
  let photo =
    "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

  try {
    // *cloudinary setup //*
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "mainPhoto",
          }
        );
        if (uploadedPhoto) {
          photo = uploadedPhoto.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    const CreateMain = new Main({
      title,
      name,
      description,
      smallDescription,
      photo,
    });
    if (!CreateMain) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }
    await CreateMain.save();
    res.status(200).json({
      success: true,
      message: "Successfully upload data....",
      data: CreateMain,
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};

//*updated main section data//*
export const UpdatedMainSectionData = async (req, res, next) => {
  const { title, smallDescription, name, description } = req.body;

  try {
    // *cloudinary setup //*

    let photo =
      "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "mainPhoto",
          }
        );
        if (uploadedPhoto) {
          photo = uploadedPhoto.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    const updatedData = {
      ...(name && { name }),
      ...(title && { title }),
      ...(smallDescription && { smallDescription }),
      ...(description && { description }),
      ...(req.file && { photo }),
    };
    const updatedMainSection = await Main.findOneAndUpdate(
      { Key_id: "INFO_MAIN" },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMainSection) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }

    res.status(200).json({
      success: true,
      message: "Successfully update data....",
      data: updatedMainSection,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};

export const GetBanner = async (req, res, next) => {
  try {
    const bannerData = await Main.findOne({ Key_id: "INFO_MAIN" });
    res.status(200).json({
      success: true,

      data: [bannerData],

      message: "successfully bannerData get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
