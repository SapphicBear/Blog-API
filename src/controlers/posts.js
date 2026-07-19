import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        try {
            if (req.user.role !== "ADMIN") {
                // For non-admin roles, only show posts that are published
                if (!req.params.postId) {
                    if (!req.query.comments) {
                        req.posts = await prisma.post.findMany({
                            where: {
                                OR: [
                                    {
                                        published: true,
                                    },
                                    {
                                        authorId: req.user.id,
                                    },
                                ],
                            },
                            include: {
                                author: true,
                            },
                        });
                    } else {
                        req.posts = await prisma.post.findMany({
                            where: {
                                OR: [
                                    {
                                        published: true,
                                    },
                                    {
                                        authorId: req.user.id,
                                    },
                                ],
                            },
                            include: {
                                comments: true,
                                author: true,
                            },
                        });
                    }
                } else {
                    if (isNaN(req.params.postId)) {
                        throw new Error(
                            "Wrong type of postId given. Please provide a number!"
                        );
                    }
                    if (!req.query.comments) {
                        req.posts = await prisma.post.findUnique({
                            include: {
                                author: true,
                            },
                            where: {
                                id: parseInt(req.params.postId),

                                OR: [
                                    {
                                        published: true,
                                    },
                                    {
                                        authorId: req.user.id,
                                    },
                                ],
                            },
                        });
                    } else {
                        req.posts = await prisma.post.findUnique({
                            include: {
                                comments: true,
                                author: true,
                            },
                            where: {
                                id: parseInt(req.params.postId),

                                OR: [
                                    {
                                        published: true,
                                    },
                                    {
                                        authorId: req.user.id,
                                    },
                                ],
                            },
                        });
                    }
                }
                if (!req.posts) {
                    throw new Error("No posts found in database.");
                }
                res.json(req.posts);
            } else {
                if (!req.params.postId) {
                    if (!req.query.comments) {
                        req.posts = await prisma.post.findMany({
                            include: {
                                author: true,
                            },
                        });
                    } else {
                        req.posts = await prisma.post.findMany({
                            include: {
                                comments: true,
                                author: true,
                            },
                        });
                    }
                } else {
                    if (isNaN(req.params.postId)) {
                        throw new Error(
                            "Wrong type of postId given. Please provide a number!"
                        );
                    }
                    if (!req.query.comments) {
                        req.posts = await prisma.post.findUnique({
                            include: {
                                author: true,
                            },
                            where: {
                                id: parseInt(req.params.postId),
                            },
                        });
                    } else {
                        req.posts = await prisma.post.findUnique({
                            include: {
                                comments: true,
                                author: true,
                            },
                            where: {
                                id: parseInt(req.params.postId),
                            },
                        });
                    }
                }
            }
            if (!req.posts) {
                throw new Error("No posts found in database.");
            }
            res.json(req.posts);
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json({ msg: `${err}` });
        }
    },
    async post(req, res) {
        if (!req.user) {
            res.sendStatus(401);
        }
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
            res.json({ msg: `${err}` });
        }
    },
    async put(req, res) {
        if (!req.user) {
            res.sendStatus(401);
        }
        try {
            if (req.user.role !== "ADMIN") {
                switch (req.body.type) {
                    case "title":
                        await prisma.post.update({
                            where: {
                                id: parseInt(req.params.postId),
                                authorId: req.user.id,
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
                                authorId: req.user.id,
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
                                authorId: req.user.id,
                            },
                            data: {
                                published: req.body.data,
                            },
                        });
                        break;
                    default:
                        throw new Error("Type not specified correctly.");
                }
            } else {
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
            }
            res.json({
                msg: `${req.body.type} edited on post ${req.params.postId}`,
            });
        } catch (err) {
            console.error(err);
            res.json({ msg: `${err}` });
        }
    },
    async delete(req, res) {
        // Authentication, TODO
        if (!req.user) {
            res.sendStatus(401);
        }
        try {
            if (req.user.role !== "ADMIN") {
                const post = await prisma.post.delete({
                    where: {
                        AND: [
                            { id: parseInt(req.params.postId) },
                            { authorId: req.user.id },
                        ],
                    },
                });
            } else {
                const post = await prisma.post.delete({
                    where: {
                        id: parseInt(req.params.postId),
                    },
                });
            }
            res.json({ post: post, msg: "Post sucessfully deleted" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json({ msg: `${err}` });
        }
    },
};

export default controller;
