import User from "../Model/User.js";
import jwt from "jsonwebtoken";

export const protectedRout = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "unAuthorized: no token" });
    }

    // 2. Extract token safely
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "unAuthorized: invalid token" });
  }
};