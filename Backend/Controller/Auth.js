import { jwtToken } from "../Utils/jwtToken.js";
import User from "../Model/User.js";
import crypto from "crypto";
import { sendEmail } from "../Utils/sendEmail.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res, next) => {
  let { name, email, password, role, profile } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const createNewUser = await User.create({
      name,
      email,
      password,
      // role,
      // profile,
    });

    const token = jwtToken(createNewUser._id);

    return res.status(201).json({
      token,
      user: {
        id: createNewUser._id,
        name: createNewUser.name,
        email: createNewUser.email,
        role: createNewUser.role,
        profile: createNewUser.profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "invalid user or password" });
    }

    const token = jwtToken(user._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // role: user.role,
        // profile: user.profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token and expiry
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // Reset link
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Email template
    const html = `
 <div style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#4f46e5; padding:28px 32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">
                🔒 Password Reset
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px; font-size:15px; color:#333333; line-height:1.6;">
                Hello <strong>${user.name}</strong>,
              </p>
              <p style="margin:0 0 24px; font-size:15px; color:#333333; line-height:1.6;">
                We received a request to reset your password. Click the button below to choose a new one.
              </p>

              <!-- Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" style="border-radius:8px; background-color:#4f46e5;">
                    <a href="${resetUrl}" target="_blank"
                      style="display:inline-block; padding:14px 32px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px; font-size:13px; color:#888888; line-height:1.5; text-align:center;">
                Or copy and paste this link into your browser:<br>
                <a href="${resetUrl}" target="_blank" style="color:#4f46e5; word-break:break-all;">${resetUrl}</a>
              </p>

              <p style="margin:24px 0 0; font-size:14px; color:#e11d48; background-color:#fef2f2; padding:12px 16px; border-radius:8px; text-align:center;">
                ⏱ This link will expire in <strong>15 minutes</strong>.
              </p>

              <p style="margin:24px 0 0; font-size:13px; color:#999999; line-height:1.6;">
                If you didn't request this, you can safely ignore this email — your password will remain unchanged.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#f9fafb; text-align:center;">
              <p style="margin:0; font-size:12px; color:#aaaaaa;">
                © ${new Date().getFullYear()} YourApp. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`;
    // Send email
    await sendEmail(user.email, "Reset Your Password", html);

    return res.status(200).json({
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required",
      });
    }

    const user = await User.findOne({ passwordResetToken: token });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // manual expiry check (SAFE FIX)
    if (user.passwordResetExpires < Date.now()) {
      return res.status(400).json({
        message: "Token expired",
      });
    }

    // update password
    user.password = await bcrypt.hash(newPassword, 10);

    // clear reset fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logOut = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
