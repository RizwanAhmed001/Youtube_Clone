const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true 
    },
    description: { 
        type: String 
    },
    channelPic: { 
        type: String 
    },
    channelBanner: { 
        type: String 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    subscribers: { 
        type: Number, 
        default: 0 
    },
    video: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "video" 
    }],
}, { timestamps: true });

module.exports = mongoose.model("channel", channelSchema);

