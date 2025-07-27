import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validateRequset";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";
import { multerUpload } from "../../config/multer.config";


const router = Router();
router.post('/register', multerUpload.single("file"), validationRequest(createUserZodSchema), UserControllers.createUser)
router.get('/all-user', checkAuth(Role.ADMIN, Role.SUPER_ADMIN ) , UserControllers.getAllUsers)
router.get('/me', checkAuth(...Object.values(Role) ) , UserControllers.getMe)
router.patch('/:id',multerUpload.single("file"),validationRequest(updateUserZodSchema),checkAuth(...Object.values(Role)), UserControllers.updateUser )

export const UserRoutes = router;