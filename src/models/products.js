import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        brand: String,
        price: Number,
        stock: Number,

        image_url: String,
        is_active: Boolean,

        variants: [
            {
                size_ml: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                
                stock: {
                    type: Number,
                    required: true
                }

            }
        ]

    }
)

export default mongoose.model("products", productSchema);