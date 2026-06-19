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
};

export default controller;
