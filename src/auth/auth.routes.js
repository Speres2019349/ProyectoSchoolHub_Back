import { Router } from "express";
import { check } from "express-validator";
import { register, login } from "./auth.controller.js";
import { validateFields } from "../middlewares/validateFields.js";
import { existeEmail } from "../helpers/db-validators.js";

const router = Router();

router.post(
    '/register',
    [
        check("username", 'Username is required').not().isEmpty(),
        check("email", 'Email is required').isEmail(),
        check("email").custom(existeEmail),
        check("password", 'The password must be greater than 6 characters').isLength({ min: 6 }),
        check("password", 'The password is required').not().isEmpty(),
        validateFields
    ], register);

router.post(
    '/login',
    [
        check("email").isEmail(),
        check("password").not().isEmpty(),
        check("password", "The password must be greater than 6 characters").isLength({min: 6,}),
        validateFields
    ], login);

export default router;