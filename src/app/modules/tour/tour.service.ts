import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { tourSearchableField } from "./tour.search.contraint";
import { QueryBuilder } from "../../utils/queryBuilder";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";


const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }
    const tour = await Tour.create(payload)
    return tour;
};


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

const getAllTours = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Tour.find(), query)
    const tours = await queryBuilder
        .search(tourSearchableField)
        .filter()
        .sort()
        .fields()
        .paginate()

    // .build()
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])
    return {
        data,
        meta
    };
};
const updateTour = async (id: string, payload: ITour) => {
    const existingTour = await Tour.findById(id);
    if (!existingTour) {
        throw new Error("Tour not found.");
    }

    if (payload.images && payload.images.length && existingTour.images && existingTour.images.length) {
        payload.images = [...payload.images, ...existingTour.images]
    }

    if (payload.deleteImages && payload.deleteImages.length && existingTour.images && existingTour.images.length) {

        const restDBImage = existingTour.images.filter(imageUrl => !payload.deleteImages?.includes(imageUrl))
        const updatedPayloadImages = (payload?.images || [])
            .filter(imageUrl => !payload.deleteImages?.includes(imageUrl))
            .filter(imageUrl => !restDBImage.includes(imageUrl))
        payload.images = [...restDBImage, ...updatedPayloadImages]
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.deleteImages && payload.deleteImages.length > 0 && existingTour.images && existingTour.images.length > 0) {
        await Promise.all(payload.deleteImages.map(url => deleteImageFromCloudinary(url)))
    }
    return updatedTour;
};
const deleteTour = async (id: string) => {
    const existingTourType = await Tour.findById(id);
    if (!existingTourType) {
        throw new Error("Tour not found.");
    }
    await Tour.findByIdAndDelete(id);
    return null
};



// tour type....
const createTourType = async (payload: ITourType) => {

    const existingTourType = await TourType.findOne({ name: payload.name });

    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }

    const result = await TourType.create(payload);
    return result
};
const getAllTourType = async () => {
    const result = await TourType.find();
    return result
};

const updateTourType = async (id: string, payload: ITourType) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }
    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};
const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }
    await TourType.findByIdAndDelete(id);
    return null
};

export const TourService = {
    createTour,
    getAllTours,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
}