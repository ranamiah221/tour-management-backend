"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRoutes = void 0;
const express_1 = require("express");
const tour_controller_1 = require("./tour.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequset_1 = require("../../middleware/validateRequset");
const tour_validate_1 = require("./tour.validate");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
// Tour Types..
router.get('/tour-type', tour_controller_1.TourController.getAllTourType);
router.post('/create-tour-type', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, validateRequset_1.validationRequest)(tour_validate_1.createTourTypeZodSchema), tour_controller_1.TourController.createTourType);
router.patch("/tour-types/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, validateRequset_1.validationRequest)(tour_validate_1.updateTourZodSchema), tour_controller_1.TourController.updateTourType);
router.delete("/tour-types/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.TourController.deleteTourType);
// Tour Routes..
router.post('/create', multer_config_1.multerUpload.array("files"), (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, validateRequset_1.validationRequest)(tour_validate_1.createTourZodSchema), tour_controller_1.TourController.createTour);
router.get('/', tour_controller_1.TourController.getAllTours);
router.patch('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), multer_config_1.multerUpload.array("files"), (0, validateRequset_1.validationRequest)(tour_validate_1.updateTourZodSchema), tour_controller_1.TourController.updateTour);
router.delete('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.TourController.deleteTour);
exports.TourRoutes = router;
