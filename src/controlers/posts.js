import prisma from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        console.log(req);
        res.json({ msg: "Controller/posts " });
    },
};
export default controller;
