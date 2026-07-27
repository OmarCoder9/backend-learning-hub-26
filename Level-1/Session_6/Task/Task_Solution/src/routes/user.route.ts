import userController from "../controller/user.controller";
import { Router } from "express";
import authMiddleware from "../middlewares/authentication.middleware";
import authorizationMiddleware from "../middlewares/authorization.middleware";
const router = Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/signout", userController.signOut);
router.get("/profile", authMiddleware, userController.getProfile);
router.get(
  "/admin-only",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  userController.adminOnly,
);

export default router;
