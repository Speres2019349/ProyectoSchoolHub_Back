export const validateRol = async (rol) => {
    const validateRol = ["Alumno", "SuperAdmin"];

    if (!validateRol.includes(rol)) {
        return true;
    } else {
        return false;
    }
}