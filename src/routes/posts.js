import { Router } from "express";
import controllers from "./../controlers/index.js";
const router = Router();
router.get("/", controllers.posts.get);
router.get("/:postId", controllers.posts.get);
router.post("/", controllers.posts.post);
router.put("/:postId", controllers.posts.put);
router.delete("/:postId", controllers.posts.delete);

export default router;
