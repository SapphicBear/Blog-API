import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        if (!req.params.userId) {
            try {
                req.users = await prisma.user.findMany({
                    include: {
                        posts: true,
                        comments: true,
                    },
                });
                res.json(req.users);
            } catch (err) {
                console.error(err);
                res.json(err);
            }
        } else {
            try {
                req.users = await prisma.user.findUnique({
                    where: {
                        id: parseInt(req.params.userId),
                    },
                    include: {
                        posts: true,
                        comments: true,
                    },
                });
                res.json({ users: req.users });
            } catch (err) {
                console.error(err);
                res.json(err);
            }
        }
    },
    async post(req, res) {
        // A user has a username, email, posts and comments
        try {
            await prisma.user.create({
                include: {
                    posts: [],
                    comments: [],
                },
                data: {
                    email: req.query.email,
                    name: req.query.name,
                    password: req.query.password,
                },
            });
            res.json({ msg: "User added to database" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json({ error: err });
        }
    },
    async put(req, res) {
        try {
            switch (req.query.type) {
                case "name":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            name: req.query.data,
                        },
                    });
                    break;
                case "email":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            email: req.query.data,
                        },
                    });
                    break;
                case "password":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            password: req.query.data,
                        },
                    });
                    break;
                case "role":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            role: req.query.data,
                        },
                    });
                default:
                    throw new Error("No type given for update!");
            }
        } catch (err) {
            console.error(err);
            res.json(err);
        } finally {
            res.json({
                msg: `User info updated for userId: ${req.params.userId}`,
            });
        }
    },
};

export default controller;
