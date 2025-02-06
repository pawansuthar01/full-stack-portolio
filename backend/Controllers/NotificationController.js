import Notification from "../Modules/NotificationModule.js";
import User from "../Modules/UserModule.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/SendEmail.js";

export const sendNotification = async (req, res, next) => {
  try {
    const { type, message, DataUrl, all, userId } = req.body;
    if (!all && !userId) {
      return next(
        new AppError("Please provide either userId or set 'all' to true.", 400)
      );
    }

    if (!type || !message) {
      return next(new AppError("please Give data to send Notification", 400));
    }
    if (all) {
      const users = await User.find({}, "_id");
      if (users.length === 0) {
        return next(new AppError("No users found to send notifications.", 404));
      }
      const notifications = users.map((user) => ({
        userId: user._id,
        type,
        message,
        DataUrl,
      }));

      await Notification.insertMany(notifications);
      return res.status(200).json({
        success: true,
        message: "successFully send notifications All users...",
      });
    }

    if (userId) {
      const notification = new Notification({
        userId,
        type,
        message,
        DataUrl,
      });

      await notification.save();
      res.status(200).json({
        success: true,
        message: "successFully send notification  users...",
      });
    }
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const sendEmailToUser = async (req, res, next) => {
  try {
    const { all, email, subject, customHtml } = req.body;
    const currentDate = new Date().toLocaleDateString();
    if (!all && !email) {
      return next(
        new AppError(
          "Please provide either user email or set 'all' to true.",
          400
        )
      );
    }
    if (!subject || !customHtml) {
      return next(new AppError("please Give data to send email", 400));
    }
    const finalHtml = `
      ${customHtml.join("")}
      <p style="font-size: 12px; color: #999;">Sent on: ${currentDate}</p>
    `;

    if (all) {
      const users = await User.find({}, "email");

      for (const user of users) {
        const res = await sendEmail(user.email, subject, finalHtml);
        console.log(res);
      }

      return res.status(200).json({
        success: true,
        message: "successFully send emails All users...",
      });
    }

    if (email) {
      await sendEmail(email, subject, finalHtml);

      res.status(200).json({
        success: true,
        message: "successFully send email  users...",
      });
    }
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
