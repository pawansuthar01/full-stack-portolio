import Feedback from "../Modules/feedbackModule.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/EmailSender.js";

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
    const subjectForAdmin = "📢 New Feedback Received";
    const adminMessage = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    
    <h2 style="color: #007bff; text-align: center; margin-bottom: 20px;">📢 New Feedback Received</h2>

    <p style="font-size: 16px; color: #333;">Dear Admin,</p>

    <p style="font-size: 15px; color: #555;">
      You have received new feedback from a user. Below are the details:
    </p>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; margin-top: 15px;">
      <p><strong>👤 User Name:</strong> ${name}</p>
      <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
      <p><strong>⭐ rating:</strong> ${rating}</p>
      <p><strong>💬 Feedback:</strong> ${message}</p>
    </div>

    <p style="margin-top: 20px; font-size: 15px; color: #555;">
      Please review and respond accordingly.
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="font-size: 14px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #007bff;">Your Website Team</p>

  </div>
`;

    const userSubject = "✅ Feedback Submitted Successfully!";
    const userMessage = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    
    <h2 style="color: #28a745; text-align: center; margin-bottom: 20px;">✅ Feedback Submitted Successfully!</h2>

    <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>

    <p style="font-size: 15px; color: #555;">
      Thank you for sharing your valuable feedback! We appreciate your time and effort in helping us improve.
    </p>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin-top: 15px;">
      <p><strong>📌 Your Submitted Details:</strong></p>
      <p><strong>⭐ Subject:</strong> ${rating}</p>
      <p><strong>💬 Feedback:</strong> ${message}</p>
    </div>

    <p style="margin-top: 20px; font-size: 15px; color: #555;">
      Our team will review your feedback and get back to you if necessary. Thank you for helping us improve!
    </p>

    <p>If you need further assistance, feel free to contact us at 
      <a href="mailto:${process.env.EMAIL}" style="color: #007bff; text-decoration: none;">${process.env.EMAIL}</a>.
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="font-size: 14px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #007bff;">Your Website Team</p>

  </div>
`;

    try {
      await sendEmail(process.env.EMAIL, subjectForAdmin, adminMessage);
      await sendEmail(email, userSubject, userMessage);
    } catch (error) {
      return next(new AppError(error.message, 400));
    }
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
    const feedbackData = await Feedback.find({})
      .skip(skip)
      .limit(parseInt(limit));
    const countFeedback = await Feedback.countDocuments({});
    const happyCustomers = await Feedback.countDocuments({
      rating: { $gte: 3 },
    });
    if (!feedbackData) {
      return next(
        new AppError("something went wrong , please tyr Again  ", 400)
      );
    }
    res.status(200).json({
      success: true,
      message: "successfully get feedback...",
      data: feedbackData,
      totalPage: Math.ceil(countFeedback / limit),
      countFeedback,
      happyCustomers,
      currentPage: page,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
