var jsonwebtoken = require("jsonwebtoken");
var config = require("../../config/setting.json");

function verifyToken(role) {
  return function (req, res, next) {
    const token = req.cookies.jsonwebtoken;
    if (!token) {
      return res.status(401).send({
        auth: false,
        message: "No token prodvided.",
      });
    };

    try {
      const decoded = jsonwebtoken.verify(token, config.jwt.secret);

      let details = (req.userData = {
        user: decoded.user,
        roles: decoded.roles,
        claims: decoded.claims,
      });

      if (
        (role === "user" && details.roles[0] === "user") ||
        details.roles[0] === "admin"
      ) {
        next();
      } else if (role === "admin" && details.roles[0] === "admin") {
        next();
      } else
        return res.status(401).send({
          auth: false,
          message: "You do not have permission",
        });
    } catch (error) {
      return res.status(500).send({
        auth: false,
        message: "Fail to authenticate token",
      });
    };
  };
};

module.exports = verifyToken;
