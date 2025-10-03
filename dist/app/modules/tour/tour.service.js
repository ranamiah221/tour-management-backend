"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourService = void 0;
const tour_model_1 = require("./tour.model");
const tour_search_contraint_1 = require("./tour.search.contraint");
const queryBuilder_1 = require("../../utils/queryBuilder");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createTour = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }
    const tour = yield tour_model_1.Tour.create(payload);
    return tour;
});
// const oldGetAllTours = async (query: Record<string, string>) => {
//     const filter = query;
//     const sort = query.sort || "-createdAt";
//     const searchTerm = query.searchTerm || "";
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 2;
//     const skip = (page - 1) * limit;
//     // field filtering..
//     const fields = query.fields?.split(",").join(" ") || "";
//     for (const field of excludeFiled) {
//         // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
//         delete filter[field]
//         // delete filter["searchTerm"]
//         // delete filter["sort"]
//     }
//     const searchQuery = {
//         $or: tourSearchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
//     }
//     const result = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);
//     const totalTour = await Tour.countDocuments();
//     const meta = {
//         page: page,
//         limit: limit,
//         total: totalTour,
//         totalPage: Math.ceil(totalTour / limit)
//     }
//     return {
//         data: result,
//         meta: meta
//     };
// };
const getAllTours = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(tour_model_1.Tour.find(), query);
    const tours = yield queryBuilder
        .search(tour_search_contraint_1.tourSearchableField)
        .filter()
        .sort()
        .fields()
        .paginate();
    // .build()
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = yield Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findById(id);
    if (!existingTour) {
        throw new Error("Tour not found.");
    }
    if (payload.images && payload.images.length && existingTour.images && existingTour.images.length) {
        payload.images = [...payload.images, ...existingTour.images];
    }
    if (payload.deleteImages && payload.deleteImages.length && existingTour.images && existingTour.images.length) {
        const restDBImage = existingTour.images.filter(imageUrl => { var _a; return !((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.includes(imageUrl)); });
        const updatedPayloadImages = ((payload === null || payload === void 0 ? void 0 : payload.images) || [])
            .filter(imageUrl => { var _a; return !((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.includes(imageUrl)); })
            .filter(imageUrl => !restDBImage.includes(imageUrl));
        payload.images = [...restDBImage, ...updatedPayloadImages];
    }
    const updatedTour = yield tour_model_1.Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.deleteImages && payload.deleteImages.length > 0 && existingTour.images && existingTour.images.length > 0) {
        yield Promise.all(payload.deleteImages.map(url => (0, cloudinary_config_1.deleteImageFromCloudinary)(url)));
    }
    return updatedTour;
});
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.Tour.findById(id);
    if (!existingTourType) {
        throw new Error("Tour not found.");
    }
    yield tour_model_1.Tour.findByIdAndDelete(id);
    return null;
});
// tour type....
const createTourType = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.TourType.findOne({ name: payload.name });
    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }
    const result = yield tour_model_1.TourType.create(payload);
    return result;
});
const getAllTourType = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tour_model_1.TourType.find();
    return result;
});
const updateTourType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }
    const updatedTourType = yield tour_model_1.TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
});
const deleteTourType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }
    yield tour_model_1.TourType.findByIdAndDelete(id);
    return null;
});
exports.TourService = {
    createTour,
    getAllTours,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
};
