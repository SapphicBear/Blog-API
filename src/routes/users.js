import { Router } from "express";
import controllers from "./../controlers/index.js";
const router = Router();

router.get("/", controllers.users.get);
// router.post();
// router.put();
// router.delete();
export default router;
