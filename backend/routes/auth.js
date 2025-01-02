import express from "express";
import bcrypt, { hash } from "bcrypt";
import users from "../schemas/User.js"
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import getuser from "../middlewares/getuser.js";

const router = express.Router();

//signup router
router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }

    let user = await users.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "user with this email already exsists" });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(req.body.password, salt);
      user = await users.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedpass,
      });
      const payload = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      res
        .status(200)
        .json({ message: "user created", email: req.body.email, authtoken });
    } catch (e) {
      res.status(500).json({ Error: "Internal Server error" });
    }

    // using promises
    //   .then((user) => res.json(user))
    //   .catch((err) => res.status(400).send("user already exsists"));
  }
);

//login router

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "invalid credentials" });
      }
      const passwordres = await bcrypt.compare(password, user.password);
      if (!passwordres) {
        return res.status(400).json({ error: "invalid credentials" });
      }
      const payload = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return res
        .status(200)
        .json({ message: "user logged in", email, authtoken });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: "Internal Server error", err: err });
    }
  }
);

router.post("/user", getuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await users.findById(userid).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
export default router;
