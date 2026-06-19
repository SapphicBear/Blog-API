import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        // If param/query wants all, send all, otherwise, return only post specified by id
        if (!req.params.postId) {
            req.posts = await prisma.post.findMany();
        } else {
            try {
                req.posts = await prisma.post.findUnique({
                    where: {
                        id: parseInt(req.params.postId),
                    },
                });
            } catch (err) {
                console.error(err);
            }
        }
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
