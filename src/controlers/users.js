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
                if (!req.users) {
                    throw new Error("No users found in database.");
                }
                res.json(req.users);
            } catch (err) {
                console.error(err);
                res.json({ msg: `${err}` });
            }
        } else {
            try {
                if (isNaN(req.params.userId)) {
                    throw new Error(
                        "userId Must be a number. Please provide a number parameter"
                    );
                }
                req.users = await prisma.user.findUnique({
                    where: {
                        id: parseInt(req.params.userId),
                    },
                    include: {
                        posts: true,
                        comments: true,
                    },
                });
                if (!req.users) {
                    throw new Error("No user was found with this userId");
                }
                res.json({ users: req.users });
            } catch (err) {
                console.error(err);
                res.json({ msg: `${err}` });
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
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                },
            });
            res.json({ msg: "User added to database" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json({ msg: `${err}` });
        }
    },
    async put(req, res) {
        try {
            if (!req.params.userId) {
                throw new Error(
                    "No userId provided. Please provide a userId number."
                );
            }
            switch (req.body.type) {
                case "name":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            name: req.body.data,
                        },
                    });
                    break;
                case "email":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            email: req.body.data,
                        },
                    });
                    break;
                case "password":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            password: req.body.data,
                        },
                    });
                    break;
                case "role":
                    await prisma.user.update({
                        where: {
                            id: parseInt(req.params.userId),
                        },
                        data: {
                            role: req.body.data,
                        },
                    });
                default:
                    throw new Error("No type given for update!");
            }
            res.json({
                msg: `User info updated for userId: ${req.params.userId}`,
            });
        } catch (err) {
            console.error(err);
            res.json({ msg: `${err}` });
        }
    },
    async delete(req, res) {
        // Authentication, TODO
        // if (req.user.role !== "ADMIN") {
        //     return;
        // }
        try {
            if (!req.params.userId) {
                throw new Error("Please provide a userId.");
            } else if (isNaN(req.params.userId)) {
                throw new Error("UserId must be a number.");
            }
            const user = await prisma.user.delete({
                where: {
                    id: req.params.userId,
                },
            });
            res.json({ user: user, msg: "User sucessfully deleted" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json({ msg: `${err}` });
        }
    },
};

export default controller;
