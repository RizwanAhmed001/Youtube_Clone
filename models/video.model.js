const mongoose  = require("mongoose")

const videoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    videoLink: { 
        type: String, 
        required: true 
    },
    thumbnail: { 
        type: String ,
        required:true
    },
    views: { 
        type: Number, 
        default: 0 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    dislikes: { 
        type: Number, 
        default: 0 
    },
    videoType: { 
        type: String ,
        default: "All"
    },
},{ timestamps: true });

module.exports =  mongoose.model("video", videoSchema);
