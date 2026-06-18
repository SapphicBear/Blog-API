import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        console.log(req);
        req.posts = {
            title: "Hello!",
            authorId: 1,
            content: "Hello everyone!",
        };
        res.json({ posts: req.posts });
    },
    async post(req, res) {
        console.log("From controllers/posts, POST request");
        res.json({ msg: "POST Request on /posts" });
    },
};

export default controller;
