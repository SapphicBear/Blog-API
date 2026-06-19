import { Router } from "express";
import controllers from "./../controlers/index.js";
const router = Router();

router.get("/", controllers.users.get);
router.get("/:userId", controllers.users.get);
router.post("/", controllers.users.post);
router.put("/:userId", controllers.users.put);
// router.delete();
export default router;
