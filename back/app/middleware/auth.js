const jwt = require("jsonwebtoken");

// create a token for the user in reference of its id
module.exports = (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userID: userId };
    if (req.body.userId && req.body.userId !== userId) {
      // if the userId doen't match with the token userId:
      throw new Error("Invalid user ID");
    } else {
      next();
    }
  } catch (error) {
    const tokenVerificationError = {
      ["invalid signature"]: "Invalid token",
      ["jwt expired"]: "Token expired",
      ["invalid token"]: "Invalid token",
      ["invalid user ID"]: "Invalid user",
      ["jwt malformed"]: "Invalid token",
      ["cannot read property 'split' of undefined"]: "No token in the request",
    };
    return res.status(401).send({ error : tokenVerificationError[error.message] });
  }
};

