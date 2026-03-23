exports.getUserProfile = catchAsyncError(async (req, res, next) => {


  const formatUser = (user) => ({
  name: user.name,
  email: user.email,
  role: user.role,
  products: user.products,
});

  res.status(200).json({
    success: true,
    user: formatUser(user),
  });
});