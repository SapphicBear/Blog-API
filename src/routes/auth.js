import { Router } from "express";
import controllers from "./../controlers/index.js";

const router = Router();
router.post("/", controllers.auth.login);
export default router;
