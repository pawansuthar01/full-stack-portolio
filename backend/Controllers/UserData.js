import sendEmail from "../Utils/EmailSender.js";

export const userDetails = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: No user details provided.",
      });
    }

    const subject = "🛡 New User Activity Logged - Tracking Data Received";

    const message = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; background: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      
      <div style="background: linear-gradient(90deg, #007BFF, #00D4FF); padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
        <h2 style="color: white; margin: 0;">🛡 New User Activity Logged</h2>
      </div>
  
      <div style="padding: 20px; color: #333;">
        <p style="font-size: 16px;">Hello Admin,</p>
        <p style="font-size: 14px;">A new user activity has been logged on your website. Below are the details:</p>
  
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr style="background: #007BFF; color: white;">
            <th style="padding: 10px; text-align: left;">🔹 Details</th>
            <th style="padding: 10px; text-align: left;">🔍 Information</th>
          </tr>
          <tr style="background: #f2f2f2;">
            <td style="padding: 10px;">📍 IP Address</td>
            <td style="padding: 10px;">${req.body.ip}</td>
          </tr>
          <tr>
            <td style="padding: 10px;">🌍 Location</td>
            <td style="padding: 10px;">${req.body.city}, ${req.body.region}, ${
      req.body.country
    }</td>
          </tr>
          <tr style="background: #f2f2f2;">
            <td style="padding: 10px;">📌 Coordinates</td>
            <td style="padding: 10px;">${req.body.latitude}, ${
      req.body.longitude
    }</td>
          </tr>
          <tr>
            <td style="padding: 10px;">💻 Device Info</td>
            <td style="padding: 10px;">${req.body.deviceInfo.userAgent}</td>
          </tr>
          <tr style="background: #f2f2f2;">
            <td style="padding: 10px;">🖥 Platform</td>
            <td style="padding: 10px;">${req.body.deviceInfo.platform}</td>
          </tr>
          <tr>
            <td style="padding: 10px;">🌐 Browser Language</td>
            <td style="padding: 10px;">${req.body.deviceInfo.language}</td>
          </tr>
          <tr style="background: #f2f2f2;">
            <td style="padding: 10px;">📅 Timestamp</td>
            <td style="padding: 10px;">${new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px;">🏢 Organization</td>
            <td style="padding: 10px;">${req.body.org}</td>
          </tr>
        </table>
  
        
  
        <p style="text-align: center; color: #666; font-size: 13px; margin-top: 20px;">
          This data is collected for security and analytics purposes.<br>
          For any concerns, please review the logs in your admin panel.
        </p>
  
      
  
        <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} Your Website Security Team 🚀</p>
      </div>
    </div>
  `;

    await sendEmail(process.env.EMAIL, subject, message);

    res.status(200).json({
      success: true,
      message: "User tracking information sent successfully.",
    });
  } catch (error) {
    console.error("❌ Error in sending user details email:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while sending email.",
      error: error.message,
    });
  }
};
