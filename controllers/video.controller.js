const Video = require("../models/video.model")

exports.postUploadVideo = async (req, res) => {
  try{
    const {title,description,videoLink,thumbnail,views,likes,dislikes,videoType} = req.body;
  
    if(!title || !description || !videoLink || !thumbnail || !views || !likes || !dislikes || !videoType){
      res.status(400).json({message: "Please provide all fields"})
    }
    let video = new Video({title,description,videoLink,thumbnail,views,likes,dislikes,videoType})
    await video.save();
    res.status(201).json({message: "Video Added"})

  }catch(err){
    res.status(500).json({message: "Something went wrong while fetching data"})
  }
}

exports.getAllVideos = async (req, res) => {
  try{

    let allVideo = await Video.find({})
    if(allVideo.length == 0){
      return res.status(404).json({message: "No Videos Found"})
    }
    res.status(200).json(allVideo)

  }catch(err){
    return res.status(500).json({message: "Something went wrong!"})
  }
}

exports.getSingleVideos = async (req, res) => {
  try{
    let {id} = req.params;
    let singleVideo = await Video.findById(id)
    if(!singleVideo){
      return res.status(404).json({message: "No Video Found"})
    }
    
    res.status(200).json(singleVideo)

  }catch(err){
    return res.status(500).json({ message: "Something went wrong!" });
  }
}



// {
//   "title": "",
//   "description": "",
//   "videoLink": "",
//   "thumbnail": "",
//   "views": "",
//   "likes": "",
//   "dislikes": "",
//   "videoType": ""
// }