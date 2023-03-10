import express from "express";
import { createUser, userLogin } from "../Controllers/userController.js";

import { body } from "express-validator";

const router = express.Router();

router.post(
  "/createUser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name", "Incorrect Name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  userLogin
);

export default router;
