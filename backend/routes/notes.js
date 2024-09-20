import express from "express";
import getuser from "../middlewares/getuser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();
import notes from "../schemas/Note.js";

//routes
router.get("/fetchnotes", getuser, async (req, res) => {
  try{
  const usernotes = await notes.find({ user: req.user.id });
  res.status(200).json(usernotes);
  }
  catch(e){
    res.status(500).json({error:"internal server error"})
  }
});

router.post(
  "/createnote",
  getuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
      return;
    }
    try {
      const usernote = await notes.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      res.status(200).json(usernote);
    } catch (err) {
      res.status(500).json({ error: "internal server error" });
      return;
    }
  }
);

router.put("/updatenote/:id", getuser, async (req, res) => {
  try{
  const { title, description, tag } = req.body;

  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (title) {
    newnote.tag = tag;
  }

  let note = await notes.findById(req.params.id);
  if (!note) {
    res.status(404).json({ error: "not found" });
    return;
  }
  if (note.user.toString() !== req.user.id) {
    res.status(401).json({ err: "not allowed" });
    return;
  }
  note = await notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.status(200).json(note);
}
catch(e){
  res.status().json({err:"internal server error"})
}
});

router.delete("/deletenote/:id", getuser, async (req, res) => {
  try{
  let note = await notes.findById(req.params.id);
  if (!note) {
    res.status(404).json({ error: "not found" });
    return;
  }
  if (note.user.toString() !== req.user.id) {
    res.status(401).json({ err: "not allowed" });
    return;
  }
  note = await notes.findByIdAndDelete(req.params.id);
  res.status(200).json(note);
}
catch(e){
  res.status(500).json({err:"internal server error"})
}
});
export default router;
