const HttpError = require("../models/http-error");
const User = require("../models/user");

const router = require("express").Router();

router.get("/", (req, res, next) => {});

router.post("/signup", async (req, res, next) => {
  const { name, email, password, places, image } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new Error("Signing up failed, try again later", 500));
  }

  if (existingUser) {
    return next(new HttpError("User already Exists", 422));
  }

  const createdUser = new User({
    name,
    email,
    password,
    places: [],
    image,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("error while saving user", 500));
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
});

router.post("/login", (req, res, next) => {});

module.exports = router;
