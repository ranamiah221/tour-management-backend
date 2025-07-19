import { Router } from "express";
import { TourController } from "./tour.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middleware/validateRequset";
import { createTourTypeZodSchema, updateTourZodSchema } from "./tour.validate";

const router = Router();
// Tour Types..
router.get('/tour-type', TourController.getAllTourType)
router.post('/create-tour-type', checkAuth(Role.ADMIN,Role.SUPER_ADMIN), validationRequest(createTourTypeZodSchema), TourController.createTourType)
router.patch(
    "/tour-types/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validationRequest(updateTourZodSchema),
    TourController.updateTourType
);

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTourType);

// Tour Routes..
router.post('/create', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.createTour)
router.get('/',TourController.getAllTours)
router.patch('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.updateTour)
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTour)

export const TourRoutes = router;