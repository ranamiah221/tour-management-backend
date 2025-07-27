import { Router } from "express";
import { DivisionController } from "./division.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middleware/validateRequset";
import { createDivisionSchema, updateDivisionSchema } from "./division.validate";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post('/create',multerUpload.single("file"),
 checkAuth(Role.SUPER_ADMIN, Role.ADMIN),validationRequest(createDivisionSchema),
 DivisionController.createDivision);
router.get('/',DivisionController.getAllDvisions)
router.get('/:slug',  DivisionController.getSingleDivision)
router.patch('/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN),multerUpload.single("file"), validationRequest(updateDivisionSchema), DivisionController.updateDivision);
router.delete('/:id',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision)
export const DivisionRoutes = router;

