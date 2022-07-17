const jwt = require("jsonwebtoken");

exports.generateToken = (userId) => {
  const expiresIn = 60 * 15; // 15 minute

  try {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};


