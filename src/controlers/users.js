import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        // req.users = await prisma.user.findMany();
        if (!req.params.userId) {
            req.users = { msg: "No param was specified, returning all" };
        } else {
            req.users = {
                msg: `Param specified: userId: ${req.params.userId}`,
            };
        }
        res.json({ users: req.users });
    },
    async post(req, res) {
        // A user has a username, email, posts and comments
        req.users = {
            name: req.query.name,
            email: req.query.email,
            role: req.query.role,
        };
        // await prisma.user.create({
        //     include: {
        //         posts: [],
        //         comments: [],
        //     },
        //     data: {
        //         email: req.query.email,
        //         name: req.query.name,
        //     },
        // });
        res.json({ msg: "User added to database" });
    },
};

export default controller;
