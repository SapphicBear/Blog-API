import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        try {
            if (req.user.role !== "ADMIN") {
                // User can only find themselves, no other user information can be shown
                if (
                    !req.params.userId ||
                    req.user.id === parseInt(req.params.userId)
                ) {
                    if (!req.query.posts && !req.query.comments) {
                        req.users = await prisma.user.findMany({
                            where: { id: req.user.id },
                        });
                    } else if (req.query.posts && !req.query.comments) {
                        req.users = await prisma.user.findMany({
                            where: { id: req.user.id },
                            include: {
                                posts: true,
                            },
                        });
                    } else if (req.query.comments) {
                        req.users = await prisma.user.findMany({
                            where: { id: req.user.id },
                            include: {
                                posts: true,
                                comments: true,
                            },
                        });
                    }
                } else {
                    res.sendStatus(401);
                }
                res.json(req.users);
            } else {
                if (!req.params.userId) {
                    req.users = await prisma.user.findMany(); // Find all users for ADMIN users
                } else if (req.query.posts && !req.query.comments) {
                    req.users = await prisma.user.findMany({
                        include: {
                            posts: true,
                        },
                    });
                } else if (req.query.posts && req.query.comments) {
                    req.users = await prisma.user.findMany({
                        include: {
                            posts: true,
                            comments: true,
                        },
                    });
                } else {
                    if (isNaN(req.params.userId)) {
                        throw new Error(
                            "userId Must be a number. Please provide a number parameter"
                        );
                    } else {
                        let userId = parseInt(req.params.userId);

                        if (!req.query.posts) {
                            req.users = await prisma.user.findUnique({
                                where: {
                                    id: userId,
                                },
                            });
                        } else if (req.query.posts && !req.query.comments) {
                            req.users = await prisma.user.findUnique({
                                where: {
                                    id: userId,
                                },
                                include: {
                                    posts: true,
                                },
                            });
                        } else if (req.query.posts && req.query.comments) {
                            req.users = await prisma.user.findUnique({
                                where: {
                                    id: userId,
                                },
                                include: {
                                    posts: true,
                                    comments: true,
                                },
                            });
                        }
                    }
                }
            }
            if (!req.users) {
                throw new Error("No users found in database");
            }
            res.json(req.users);
        } catch (err) {
            console.error(err);
            res.json({ msg: `${err}` });
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
        if (!req.user) {
            res.sendStatus(401);
        }
        try {
            if (!req.params.userId) {
                throw new Error(
                    "No userId provided. Please provide a userId number."
                );
            }
            if (req.user.role !== "ADMIN") {
                if (parseInt(req.params.userId) !== req.user.id) {
                    res.sendStatus(401);
                } else {
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
                            break;
                        default:
                            throw new Error("No type given for update!");
                    }
                }
            } else {
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
                        break;
                    default:
                        throw new Error("No type given for update!");
                }
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
        if (!req.user) {
            res.sendStatus(401);
        }
        try {
            if (!req.params.userId) {
                throw new Error("Please provide a userId.");
            } else if (isNaN(req.params.userId)) {
                throw new Error("UserId must be a number.");
            }
            if (req.user.role !== "ADMIN") {
                if (req.user.id !== parseInt(req.params.userId)) {
                    throw new Error("Unauthorized");
                } else {
                    const user = await prisma.user.delete({
                        where: {
                            AND: [
                                { id: parseInt(req.params.userId) },
                                { id: req.user.id },
                            ],
                        },
                    });
                }
            } else {
                const user = await prisma.user.delete({
                    where: {
                        id: parseInt(req.params.userId),
                    },
                });
            }
            res.json({ user: user, msg: "User sucessfully deleted" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400).json({ msg: `${err}` });
        }
    },
};

export default controller;
