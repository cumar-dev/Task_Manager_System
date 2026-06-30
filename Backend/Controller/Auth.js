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
        // role: createNewUser.role,
        // profile: createNewUser.profile,
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
  <h2>Password Reset</h2>

  <p>Hello <strong>${user.name}</strong>,</p>

  <p>You requested to reset your password.</p>

  <p>
    <a href="${resetUrl}" target="_blank">
      ${resetUrl}
    </a>
  </p>

  <p>This link will expire in <strong>15 minutes</strong>.</p>

  <p>If you didn't request this, ignore this email.</p>
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
  try {
    const { token, newPassword } = req.body;

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
