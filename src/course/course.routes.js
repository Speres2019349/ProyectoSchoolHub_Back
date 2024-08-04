import { Router } from "express";
import { check } from "express-validator";
import { coursesCreated } from "./course.controller.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("courseName").not().isEmpty(),
        check("creationDate"),
        check("author").not().isEmpty(),
        check("modules"),
        check("diplomas"),
        check("progress"),
        check("exams"),
        validateFields,
    ],coursesCreated);

export default router;