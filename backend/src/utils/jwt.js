import jwt from "jsonwebtoken";

const sendToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.jwt_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "devlopment" ? false : true,
    maxAge:  7 * 24 * 60 * 60 * 1000
  });

  return token;
};

export default sendToken;
