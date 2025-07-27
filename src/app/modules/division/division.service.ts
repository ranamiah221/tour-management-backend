import { deleteImageFromCloudinary } from "../../config/cloudinary.config"
import AppError from "../../errorHelper/AppError"
import { IDividion } from "./division.interface"
import { Division } from "./division.model"
import httpStatus from "http-status-codes"

const createDivision = async (payload: Partial<IDividion>) => {
    const existingDuplicate = await Division.findOne({ name: payload.name })
    if (existingDuplicate) {
        throw new AppError(httpStatus.BAD_REQUEST, "A division with this name already exists.")
    }
// work done by pre save hook inside the model
    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-")
    // let slug = `${baseSlug}-division`;
    // let counter = 0
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`
    // }
    // payload.slug = slug;

    const division = await Division.create(payload)
    return division;
}
const getAllDvisions = async () => {
    const division = await Division.find();
    const divisionCount = await Division.countDocuments()
    return {
        data: division,
        meta: {
            total: divisionCount
        }
    }
}
const getSingleDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    return {
        data: division,
    }
}
const updateDivision = async (id: string, payload: Partial<IDividion>) => {
    const existDivision = await Division.findById(id)
    if (!existDivision) {
        throw new AppError(httpStatus.NOT_FOUND, "Division not found.")
    }
    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id },
    })
    if (duplicateDivision) {
        throw new AppError(httpStatus.BAD_REQUEST, "A division with this name already exists.")
    }
    // if (payload.name) {
    //     const baseSlug = payload.name?.toLowerCase().split(" ").join("-")
    //     let slug = `${baseSlug}-division`;
    //     let counter = 0
    //     while (await Division.exists({ slug })) {
    //         slug = `${slug}-${counter++}`
    //     }
    //     payload.slug = slug;
    // }
    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    if(payload.thumbnail && existDivision.thumbnail){
        await deleteImageFromCloudinary(existDivision.thumbnail)
    }
    return updatedDivision;
}
const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null
}

export const DivisionService = {
    createDivision,
    getAllDvisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
}