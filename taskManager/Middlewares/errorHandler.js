export const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err); // VERY IMPORTANT

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};