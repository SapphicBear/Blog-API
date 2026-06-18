import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        console.log(req);
        res.json({ msg: "Controller/users" });
    },
    async post(req, res) {
        console.log("From controllers/users, POST request");
        res.json({ msg: "POST Request on /users" });
    },
};

export default controller;
