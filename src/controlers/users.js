import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        console.log(req);
        res.json({ msg: "Controller/users" });
    },
};

export default controller;
