import AppError from "../Utils/AppErrors.js";
import Skills from "../Modules/SkillsModule.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

//*create new skills cart//*
export const CreateNewSkillsCart = async (req, res, next) => {
  let { title, skills } = req.body;

  if (!title || !skills.length) {
    return next(new AppError("All fields are required for skill cart", 400));
  }
  try {
    if (typeof skills === "string") {
      skills = JSON.parse(skills);
    }

    if (!Array.isArray(skills)) {
      return next(new AppError("Skills should be an array", 400));
    }

    if (!title || !skills) {
      return next(
        new AppError(" please give All filed is required for skill cart", 400)
      );
    }

    const newSkillsCart = new Skills({
      title,
      skills,
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
    return next(new AppError(error.message, 400));
  }
};

export const newSkillAddToCart = async (req, res, next) => {
  const { id } = req.params;
  const { skills } = req.body;

  try {
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return next(new AppError("Please provide at least one skill.", 400));
    }

    const isValidSkills = skills.every(
      (skill) => skill.name && skill.level !== null
    );
    if (!isValidSkills) {
      return next(new AppError("Each skill must have a name and level.", 400));
    }

    const FindSkillsCart = await Skills.findById(id);
    if (!FindSkillsCart) {
      return next(new AppError("Skills cart not found.", 404));
    }

    FindSkillsCart.skills.push(...skills);

    await FindSkillsCart.save();

    res.status(200).json({
      success: true,
      message: "Skill added successfully to the cart.",
      data: FindSkillsCart,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const updateSkillCartTitle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FindSkillsCart = await Skills.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!FindSkillsCart) {
      return next(new AppError("Skills cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Successfully update  title",
      data: FindSkillsCart,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const newSkillUpdateToCart = async (req, res, next) => {
  const { cartId, skillId } = req.params;

  const { skills } = req.body;
  if (!cartId || !skillId) {
    return next(new AppError("Please provide at Id.", 400));
  }

  const { name, level } = skills[0];

  try {
    const FindSkillsCart = await Skills.findOneAndUpdate(
      { _id: cartId, "skills._id": skillId },
      {
        $set: {
          "skills.$.name": name, // ✅ Correctly update name
          "skills.$.level": level, // ✅ Correctly update level
        },
      },
      {
        new: true,
      }
    );
    if (!FindSkillsCart) {
      return next(new AppError("Skills cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Successfully update skill to cart.",
      data: FindSkillsCart,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteSkillInCart = async (req, res, next) => {
  const { cartId, skillId } = req.params;

  try {
    const FindSkillsCart = await Skills.findOneAndUpdate(
      { _id: cartId },
      {
        $pull: { skills: { _id: skillId } },
      },
      {
        new: true,
      }
    );
    if (!FindSkillsCart) {
      return next(new AppError("Skills cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Successfully  removed from to cart.",
      data: FindSkillsCart,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteSkillCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FindSkillsCart = await Skills.findByIdAndDelete(id);
    if (!FindSkillsCart) {
      return next(new AppError("Skills cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Skills cart deleted successfully",
      data: FindSkillsCart,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const GetSkills = async (req, res, next) => {
  try {
    const skillsData = await Skills.find();
    res.status(200).json({
      success: true,

      data: skillsData,

      message: "successfully skillsData get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
