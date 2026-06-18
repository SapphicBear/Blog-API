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
        const post = {
            title: req.query.title,
            content: req.query.content,
            author: req.query.author,
            authorId: req.query.authorId,
        };
        req.posts = [post];
        res.json({ posts: req.posts });
    },
};

export default controller;
