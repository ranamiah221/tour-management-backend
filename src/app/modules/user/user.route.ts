import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validateRequset";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router = Router();
router.post('/register', validationRequest(createUserZodSchema), UserControllers.createUser)
router.get('/all-user', checkAuth(Role.ADMIN, Role.SUPER_ADMIN ) , UserControllers.getAllUsers)
router.patch('/:id',validationRequest(updateUserZodSchema),checkAuth(...Object.values(Role)), UserControllers.updateUser )

export const UserRoutes = router;