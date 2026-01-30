import mongoose from "mongoose";


const brandsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        image_url: {
            type: String
        },
        
        category: {
            type: String,
            required: true
        }



    }
)


export default mongoose.model("brands", brandsSchema);