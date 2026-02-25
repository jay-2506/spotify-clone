import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
                return emailRegex.test(value);
            },
        },

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"

    },
    playlist: [{
        type: String,
        required: true
    }]
},
    {
        timestamps: true
    });
const User = mongoose.model("User", userschema);
export default User;