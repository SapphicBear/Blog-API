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
                    title: req.body.title,
                    content: req.body.content,
                    authorId: parseInt(req.body.authorId),
                },
            });
            res.json({ msg: "Post added to the database" });
        } catch (err) {
            console.error(err);
            res.json(err);
        }
    },
    async put(req, res) {
        try {
            switch (req.body.type) {
                case "title":
                    await prisma.post.update({
                        where: {
                            id: parseInt(req.params.postId),
                        },
                        data: {
                            title: req.body.data,
                        },
                    });
                    break;
                case "content":
                    await prisma.post.update({
                        where: {
                            id: parseInt(req.params.postId),
                        },
                        data: {
                            content: req.body.data,
                        },
                    });
                    break;
                case "published":
                    await prisma.post.update({
                        where: {
                            id: parseInt(req.params.postId),
                        },
                        data: {
                            published: req.body.data,
                        },
                    });
                    break;
                default:
                    throw new Error("Type not specified correctly.");
            }
            res.json({
                msg: `${req.body.type} edited on post ${req.params.postId}`,
            });
        } catch (err) {
            console.error(err);
            res.json(err);
        }
    },
    async delete(req, res) {
        // Authentication, TODO
        // if (req.user.role !== "ADMIN") {
        //     return;
        // }
        try {
            const post = await prisma.post.delete({
                where: {
                    id: req.params.postId,
                },
            });
            res.json({ post: post, msg: "Post sucessfully deleted" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json(err);
        }
    },
};

export default controller;
