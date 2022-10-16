const jwt = require("jsonwebtoken");

export const jwtSignature = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    "secretors"
  );
};

export const jwtVerify = (token) => {
  try {
    return jwt.verify(token, "secretors", (err, decoded) => {
      if (err) {
        return {
          error: err.username,
          message: "token is not valid",
        };
      } else {
        return decoded.data;
      }
    });
  } catch (err) {
    return {
      error: err.username,
      message: err.message,
    };
  }
};
