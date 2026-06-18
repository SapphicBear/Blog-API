import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        console.log(req);
        req.users = [{ userId: 1, name: "Taylor", age: 29 }];
        res.json({ users: req.users });
    },
    async post(req, res) {
        console.log("From controllers/users, POST request");
        res.json({ msg: "POST Request on /users" });
    },
};

export default controller;
