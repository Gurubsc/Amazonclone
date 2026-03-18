exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});