import jsonwebtoken, { decode } from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ msg: "No token: Authorization denied" });
  }

  try {
    const decodedToken = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid: Authorization denied" });
  }
};
