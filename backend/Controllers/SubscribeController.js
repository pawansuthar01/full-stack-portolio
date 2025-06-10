import Subscribe from "../Modules/subscribeModule.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/EmailSender.js";
import * as dotenv from "dotenv";
dotenv.config();
export const SubscribeUser = async (req, res, next) => {
  const { email } = req.params;
  if (!email) {
    return next(new AppError("Email is required To Subscribe...", 400));
  }
  const isExit = await Subscribe.findOne({ email });
  if (isExit) {
    return next(new AppError("Email is  already exists ...", 400));
  }
  const newSubscribe = new Subscribe({ email });
  if (!newSubscribe) {
    return next(new AppError("something wont wrong...", 400));
  }
  await newSubscribe.save();

  const subject = "🎉 Welcome to My Portfolio!";

  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #007bff; text-align: center;">🚀 Welcome to My Portfolio!</h2>
      
      <p>Dear <strong>${"Subscriber"}</strong>,</p>
  
      <p>Thank you for subscribing! You’re now part of a growing community that stays updated with my latest projects, insights, and creative work.</p>
  
      <p>Here's what you can expect:</p>
      <ul>
        <li>🔹 Exclusive updates on my latest projects.</li>
        <li>🔹 Insights and behind-the-scenes content.</li>
        <li>🔹 Special announcements and resources.</li>
      </ul>
  
      <p>Check out my latest work here:</p>
  
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_URL}" 
           style="color: #ffffff; background-color: #007bff; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
           🌟 Visit My Portfolio
        </a>
      </p>
  
      <p>If you ever have any questions or feedback, feel free to reach out to me at 
        <a href="mailto:${process.env.EMAIL}" style="color: #007bff;">${
    process.env.EMAIL
  }</a>.
      </p>
  
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
      <p>Best regards,</p>
      <p><strong>Pawan Kumar</strong></p>
    </div>
  `;

  const AdminEmail = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
   <h2 style="color: #007bff; text-align: center;">🚀 Welcome to My Portfolio!</h2>
      
      <p>Dear <strong>${" new Subscriber"}</strong>,</p>
  
      <p>Thank you for subscribing! You’re now part of a growing community that stays updated with my latest projects, insights, and creative work.</p>
  
      <p>Here's what you can expect:</p>
      <ul>
        <li>🔹 ${email}.</li>
       
      </ul>
  
      <p>Check out my latest work here:</p>
  
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_URL}" 
           style="color: #ffffff; background-color: #007bff; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
           🌟 Visit My Portfolio
        </a>
      </p>
  
     
  </div>
  `;
  try {
    await sendEmail(email, subject, message);
    await sendEmail(process.env.EMAIL, "new Subscriber", AdminEmail);
  } catch (error) {
    return next(new AppError("Failed to send email: " + error.message, 500));
  }

  res.status(200).json({
    success: true,
    message: "successfully  Subscribe...",
  });
  try {
  } catch (error) {
    return next(new AppError(error.message || "something wont wrong...", 400));
  }
};

export const AllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscribe.find({});
    const subscribersCount = await Subscribe.countDocuments({});
    res.status(200).json({
      success: true,
      message: "successfully get All subscribe...",
      data: {
        subscribers,
        subscribersCount,
      },
    });
  } catch (error) {
    return next(new AppError(error.message || "something wont wrong...", 400));
  }
};
