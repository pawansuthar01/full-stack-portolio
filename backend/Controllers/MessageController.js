import Message from "../Modules/MessageModule.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/EmailSender.js";

export const submitMessage = async (req, res, next) => {
  try {
    const { name, subject, message, email } = req.body;
    if (!name || !subject || !message || !email) {
      return next(
        new AppError("All filed is required to submitMessage...", 400)
      );
    }
    const SubmitMessage = new Message({
      fullName: name,
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
    (async () => {
      const subjectUser = "✅ Message Submitted Successfully!";
      const subjectAdmin = "📩 New Message from User";
      const EmailMessageForAdmin = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    
    <h2 style="color: #007bff; text-align: center; margin-bottom: 20px;">📩 New Message from User</h2>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
      <p><strong>👤 Sender Name:</strong> ${name}</p>
      <p><strong>📧 Sender Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
      <p><strong>📌 Subject:</strong> ${subject}</p>
    </div>

    <p style="margin-top: 20px; font-size: 16px; color: #333;">📝 <strong>Message:</strong></p>
    <p style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 15px; line-height: 1.5; color: #555;">
      ${message}
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="font-size: 14px; color: #777;">📌 This message was sent from your website's contact form.</p>

    <p style="font-size: 14px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #007bff;">${name}</p>

  </div>
`;

      const EmailMessage = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    
    <h2 style="color: #28a745; text-align: center; margin-bottom: 20px;">✅ Message Submitted Successfully!</h2>

    <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>

    <p style="font-size: 15px; color: #555;">
      Thank you for reaching out to us! We have received your message and our team will get back to you within a few hours.
    </p>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin-top: 15px;">
      <p><strong>📌 Your Submitted Details:</strong></p>
      <p><strong>📝 Subject:</strong> ${subject}</p>
      <p><strong>💬 Message:</strong> ${message}</p>
    </div>

    <p style="margin-top: 20px; font-size: 15px; color: #555;">
      We appreciate your patience and will respond as soon as possible. If you have any urgent queries, feel free to contact us at 
      <a href="mailto:${process.env.EMAIL}" style="color: #007bff; text-decoration: none;">${process.env.EMAIL}</a>.
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="font-size: 14px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #007bff;">Pawan Kumar</p>

  </div>
`;
      try {
        await sendEmail(process.env.EMAIL, subjectAdmin, EmailMessageForAdmin);
        await sendEmail(email, subjectUser, EmailMessage);
      } catch (error) {
        return next(new AppError(error.message), 400);
      }
    })();
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
