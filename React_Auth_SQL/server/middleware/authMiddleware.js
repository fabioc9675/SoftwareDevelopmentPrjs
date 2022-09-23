const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, "Fabian App secret", (err, decodedToken) => {
      // signature, same as the authController
      if (err) {
        console.log(err.message);
        res.status(400).json({ user_id: 0 });
      } else {
        console.log(decodedToken);
        res.status(201).json({ user_id: decodedToken.id });
      }
    });
  } else {
    res.status(400).json({ user_id: 0 });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 5 * 1000 });
  res.status(201).json({ user_id: 0 });
};
