const sendToken = async (res, user, message, statuscode = 200) => {
  const token = await user.getJWTToken();
  if (user.password) {
    user.set("password", undefined, { strict: false });
  }
  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    message: message,
    user,
    token,
  });
};

export default sendToken;
