import jwt from "jsonwebtoken";
const getuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "access denied" });
    return;
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "access denied" });
    return;
  }
};

export default getuser;
