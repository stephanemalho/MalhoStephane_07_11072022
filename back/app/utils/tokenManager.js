const jwt = require("jsonwebtoken");

exports.generateToken = (userId, isAdmin) => {
  const expiresIn = "24h"; // 24heures

  try {
    const token = jwt.sign({ userId , isAdmin }, process.env.JWT_TOKEN, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};


