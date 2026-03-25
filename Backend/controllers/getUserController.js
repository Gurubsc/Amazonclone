exports.getUserProfile = catchAsyncError(async (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const formatUser = (user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    products: user.products,
  });

  res.status(200).json({
    success: true,
    user: formatUser(req.user),
  });
});