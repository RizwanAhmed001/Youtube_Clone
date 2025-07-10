const mongoose  = require("mongoose")

const videoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String ,
        required: true
    },
    videoLink: { 
        type: String, 
        required: true 
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "channel"
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

// [
//   {
//     "id": "1",
//     "title": "Big Buck Bunny",
//     "description": "An animated short film by Blender Foundation. Great for testing HD video playback.",
//     "thumbnail": "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
//     "videoUrl": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
//   },
//   {
//     "id": "2",
//     "title": "Sintel Trailer",
//     "description": "A fantasy short movie trailer by Blender Foundation.",
//     "thumbnail": "https://durian.blender.org/wp-content/uploads/2010/05/sintel_poster.jpg",
//     "videoUrl": "https://media.w3.org/2010/05/sintel/trailer.mp4"
//   },
//   {
//     "id": "3",
//     "title": "Sample Nature Video",
//     "description": "Peaceful nature scenes for testing background video.",
//     "thumbnail": "https://dummyimage.com/640x360/228B22/fff&text=Nature+Video",
//     "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
//   },
//   {
//     "id": "4",
//     "title": "Small Video Sample",
//     "description": "Very small video (640x360, 1MB) ideal for fast testing.",
//     "thumbnail": "https://dummyimage.com/640x360/808080/ffffff&text=Sample+Video",
//     "videoUrl": "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
//   },
//   {
//     "id": "5",
//     "title": "Forbici Cut Scene",
//     "description": "A cinematic scene for demo purposes.",
//     "thumbnail": "https://dummyimage.com/640x360/000/fff&text=Forbici+Scene",
//     "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
//   }
// ]