import { Router } from "express";
import { check } from "express-validator";
import { updateUser, deleteUser, getUserById, courseGet, courseGetAlumno } from "./user.controller.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.put(
    "/:id",
    [
        validarJWT,
        validateFields,
    ],
updateUser);

router.delete(
    "/:id",
    [
        validarJWT,
        validateFields,
    ],
deleteUser);

router.get(
    "/:id",
    [
        validarJWT,
        validateFields,
    ],
getUserById);

export default router;