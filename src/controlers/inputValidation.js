import { body } from "express-validator";
const inputValidation = {
    login: [
        body("email").trim().isEmail().notEmpty(),
        body("password").trim().notEmpty(),
    ],
    signUp: [],
};
export default { inputValidation };
