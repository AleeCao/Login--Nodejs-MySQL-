import { Router } from "express";
import { home, login, register, registerPost, loginCheck, logout } from "../controllers/loginController.js";

const router = Router();

router.get("/home", home);
router.get("/login", login);
router.get("/logout", logout);
router.get("/register", register);
router.post("/login", loginCheck);
router.post("/register", registerPost);

export {router};