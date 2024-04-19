import express from "express";
import {
  changePassword,
  checkEmail,
  login,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/check-email", checkEmail);
router.put("/change-password", changePassword);

export default router;
