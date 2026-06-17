import { Router } from "express";
import controllers from "./../controlers/index.js";
const router = Router();

router.get("/", controllers.posts.get);
// router.post()
// router.put()
// router.delete()

export default router;
