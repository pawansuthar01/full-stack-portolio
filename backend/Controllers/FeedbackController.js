import Feedback from "../Modules/feedbackModule.js";
import AppError from "../Utils/AppErrors.js";

export const addFeedback = async (req, res, next) => {
  try {
    const { rating, message, name, email } = req.body;
    if ((!rating || !message || !name, !email)) {
      return next(new AppError("please give ratting and comment...", 400));
    }
    const feedback = new Feedback({
      name,
      message,
      email,
      rating,
    });
    if (!feedback) {
      return next(new AppError("something wont wrong , try next time...", 400));
    }
    await feedback.save();
    res.status(200).json({
      success: true,
      message: "successfully submit feedback...",
      data: feedback,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("please give id for update feedback...", 400));
    }

    const feedback = await Feedback.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!feedback) {
      return next(new AppError("something wont wrong , try next time...", 400));
    }
    await feedback.save();
    res.status(200).json({
      success: true,
      message: "successfully update feedback...",
      data: feedback,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const deleteFeedbackById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("please give id for update feedback...", 400));
    }
    await Feedback.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "successfully delete feedback...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const getAllFeedback = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const findFeedback = await Feedback.find({})
      .skip(skip)
      .limit(parseInt(limit));
    const countFeedback = await Feedback.countDocuments({});
    const happyCustomers = await Feedback.countDocuments({
      rating: { $gte: 3 },
    });
    if (!findFeedback) {
      return next(
        new AppError("something went wrong , please tyr Again  ", 400)
      );
    }
    res.status(200).json({
      success: true,
      message: "successfully get feedback...",
      data: findFeedback,
      totalPage: Math.ceil(countFeedback / limit),
      countFeedback,
      happyCustomers,
      currentPage: page,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
