import { prisma } from "./../../lib/prisma.js";

const controller = {
    async get(req, res) {
        // If param/query wants all, send all, otherwise, return only post specified by id
        // if (!req.params) {
        //     req.posts = await prisma.post.findMany();
        // } else {
        //     req.posts = await prisma.post.findUnique({
        //         where: {
        //             id: req.params.postId,
        //         },
        //     });
        // }
        if (!req.params.postId) {
            req.posts = { msg: "No param was specified, returning all" };
        } else {
            req.posts = {
                msg: `Param specified: postId: ${req.params.postId}`,
            };
        }
        res.json({ posts: req.posts });
    },
    async post(req, res) {
        const post = {
            title: req.query.title,
            content: req.query.content,
            author: req.query.author,
            authorId: req.query.authorId,
        };
        req.posts = [post];
        res.json({ posts: req.posts });
    },
};

export default controller;
