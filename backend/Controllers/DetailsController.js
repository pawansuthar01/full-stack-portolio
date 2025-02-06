import Details from "../Modules/DetailsModule.js";
import AppError from "../Utils/AppErrors.js";

export const SubmitDetails = async (req, res, next) => {
  try {
    const {
      fullName,
      x,
      inst,
      linkedin,
      git,
      facebook,
      skillDescription,
      projectDescription,
      educationDescription,
      cv,
      messageDescription,
    } = req.body;
    if (
      !fullName ||
      !projectDescription ||
      !skillDescription ||
      !educationDescription ||
      !messageDescription
    ) {
      return next(
        new AppError("All filed is required to submitDetails...", 400)
      );
    }
    const detail = new Details({
      fullName,

      cv,
      linkedin,
      facebook,
      inst,
      git,
      x,

      project: projectDescription,
      skill: skillDescription,
      education: educationDescription,
      message: messageDescription,
    });
    if (!detail) {
      return next(new AppError("something wont wrong,try next time...", 400));
    }
    await detail.save();
    res.status(200).json({
      success: true,
      message: "details submit successfully",
      data: detail,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const updateDetail = async (req, res, next) => {
  try {
    const {
      fullName,
      x,
      inst,
      linkedin,
      git,
      facebook,
      skillDescription,
      projectDescription,
      educationDescription,
      cv,
      messageDescription,
    } = req.body;
    const updateData = {
      ...(fullName && { fullName }),

      ...(cv && { cv }),
      ...(linkedin && { linkedin }),
      ...(facebook && { facebook }),
      ...(inst && { facebook }),
      ...(git && { git }),
      ...(x && { x }),

      ...(projectDescription && { project: projectDescription }),
      ...(skillDescription && { skill: skillDescription }),
      ...(educationDescription && { education: educationDescription }),
      ...(messageDescription && { message: messageDescription }),
    };

    const detail = await Details.findOneAndUpdate(
      { key_id: "Details_Key_id2" },
      updateData,
      { new: true, runValidators: true }
    );
    if (!detail) {
      return next(new AppError("something wont wrong,try next time...", 400));
    }
    await detail.save();
    res.status(200).json({
      success: true,
      message: "details update successfully",
      data: detail,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const getDetails = async (req, res, next) => {
  try {
    const details = await Details.find();
    res.status(200).json({
      success: true,
      message: "successfully get details...",
      data: details,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
