// const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    console.log("here")
    const { email, password,  firstName, lastName } = req.body;
    const user = await User.signup({
      email,
      password,
      firstName,
      lastName,
    });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);
// post image





module.exports = router;