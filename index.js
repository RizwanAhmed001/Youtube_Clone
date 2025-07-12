// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const userRoute = require("./routes/user.route");
// const dotenv = require("dotenv");
// const videoRoute = require("./routes/video.route");
// const channelRoute = require("./routes/channel.route");
// const commentRoute = require("./routes/comment.route");
// const cookieParser = require("cookie-parser");
// const cors = require("cors")


// const app = new express();
// dotenv.config();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use('/auth', userRoute)
// app.use("/api", videoRoute)
// app.use("/api", channelRoute)
// app.use("/commentApi", commentRoute)




// mongoose.connect(process.env.MONGO_URI,);

// let db = mongoose.connection;
// db.on("open", () => {
//   console.log("Connection Succesful!");
//   const port = process.env.PORT;
//   app.listen(port, () => {
//     console.log(`Server running at port http://localhost:${port}`);
//   });
// });
// db.on("error", () => {
//   console.log("Connection Fail!");
// });

// Comments
const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/user.route");
const dotenv = require("dotenv");
const videoRoute = require("./routes/video.route");
const channelRoute = require("./routes/channel.route");
const commentRoute = require("./routes/comment.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = new express();
dotenv.config();

// Enable CORS for frontend running at localhost:5173 with credentials support
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// Mount user authentication routes under /auth
app.use('/auth', userRoute);

// Mount video-related routes under /api
app.use("/api", videoRoute);

// Mount channel-related routes under /api
app.use("/api", channelRoute);

// Mount comment-related routes under /commentApi
app.use("/commentApi", commentRoute);

// Connect to MongoDB using URI from environment variables
mongoose.connect(process.env.MONGO_URI);

let db = mongoose.connection;

// On successful DB connection, start the Express server
db.on("open", () => {
  console.log("Connection Successful!");
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

// Log error if connection fails
db.on("error", () => {
  console.log("Connection Fail!");
});