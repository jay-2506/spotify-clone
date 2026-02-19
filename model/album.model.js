import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        id: String,
        url: String
    },
},
    {
        timestamps: true
    })

export default mongoose.model("Album", albumSchema)
