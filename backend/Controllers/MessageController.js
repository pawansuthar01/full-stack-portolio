import Message from "../Modules/MessageModule.js";
import AppError from "../Utils/AppErrors.js";

export const submitMessage = async (req, res, next) => {
  try {
    const { fullName, subject, message, email } = req.body;
    if (!fullName || !subject || !message || !email) {
      return next(
        new AppError("All filed is required to submitMessage...", 400)
      );
    }
    const SubmitMessage = new Message({
      fullName,
      subject,
      message,
      email,
    });
    if (!SubmitMessage) {
      return next(
        new AppError("something wont wrong , tyr again sometime...", 400)
      );
    }
    await SubmitMessage.save();
    res.status(200).json({
      success: true,
      message: "successfully submit message...",
      data: SubmitMessage,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
export const markToReadMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      new AppError("id is required to mark as read...", 400);
    }
    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true, runValidators: true }
    );
    if (!message) {
      new AppError("something wont wrong , tyr again sometime...", 400);
    }
    await message.save();
    res.status(200).json({
      success: true,
      message: "successfully mark to read  message...",
      data: message,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};

export const getAllMessage = async (req, res, next) => {
  try {
    const messages = await Message.find();
    const messagesCount = await Message.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully get message...",
      data: messages,
      count: messagesCount,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
