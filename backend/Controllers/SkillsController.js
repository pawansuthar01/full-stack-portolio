import AppError from "../Utils/AppErrors.js";
import Skills from "../Modules/SkillsModule.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

//*create new skills cart//*
export const CreateNewSkillsCart = async (req, res, next) => {
  const { title, name } = req.body;
  try {
    if (!title || !name || !req.file) {
      return next(
        new AppError(" please give All filed is required for skill cart", 400)
      );
    }
    let image = "few time url";
    if (req.file) {
      try {
        const uploadImage = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "skillCartImage",
        });
        if (uploadImage) {
          image = uploadImage.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    const newSkillsCart = new Skills({
      title,
      skill: [
        {
          image,
          name,
        },
      ],
    });
    if (!newSkillsCart) {
      return next(
        new AppError("something wont wrong to upload skills cart", 400)
      );
    }
    await newSkillsCart.save();
    res.status(200).json({
      success: true,
      message: "successFully upload skills cart",
      data: newSkillsCart,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
//*new skill add to cart//*

export const newSkillAddToCart = async (req, res, next) => {
  const { id } = req.params;

  const { name } = req.body;
  try {
    if (!name || !req.file) {
      return next(
        new AppError(" please give All filed is required for Add skill", 400)
      );
    }
    const FindSkillsCart = await Skills.findById(id);
    if (!FindSkillsCart) {
      return next(new AppError("Skills cart not found.", 404));
    }
    let image = "few time url";
    if (req.file) {
      try {
        const uploadImage = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "skillCartImage",
        });
        if (uploadImage) {
          image = uploadImage.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }

    await FindSkillsCart.skill.push({
      image,
      name,
    });

    await FindSkillsCart.save();
    res.status(200).json({
      success: true,
      message: "Successfully added skill to cart.",
      data: FindSkillsCart,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
