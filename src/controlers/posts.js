import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        // If param/query wants all, send all, otherwise, return only post specified by id
        if (!req.params.postId) {
            try {
                req.posts = await prisma.post.findMany({
                    include: {
                        comments: true,
                        author: true,
                    },
                });
                res.json(req.posts);
            } catch (err) {
                console.error(err);
                res.sendStatus(400).json(err);
            }
        } else {
            try {
                req.posts = await prisma.post.findUnique({
                    include: {
                        comments: true,
                    },
                    where: {
                        id: parseInt(req.params.postId),
                    },
                });
                res.json({ posts: req.posts });
            } catch (err) {
                console.error(err);
                res.json(err);
            }
        }
    },
    async post(req, res) {
        try {
            await prisma.post.create({
                data: {
                    title: req.query.title,
                    content: req.query.content,
                    authorId: parseInt(req.query.authorId),
                },
            });
            res.json({ msg: "Post added to the database" });
        } catch (err) {
            console.error(err);
            res.json({ error: err });
        }
    },
    async put(req, res) {
        console.log("PUT");
    },
    async delete(req, res) {},
};

export default controller;
