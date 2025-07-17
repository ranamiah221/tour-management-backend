import { model, Schema } from "mongoose";
import { IDividion } from "./division.interface";

const divisionShema = new Schema<IDividion>({
    name:{type:String, required:true, unique:true},
    slug:{type:String, unique:true},
    thumbnail:{type:String},
    description:{type:String}
},{
    timestamps:true
})

export const Division = model<IDividion>("Division", divisionShema)
