const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/user.route");
const dotenv = require("dotenv");
const videoRoute = require("./routes/video.route");

const app = new express();
dotenv.config();


app.use(express.json());
app.use('/auth', userRoute)
app.use("/api", videoRoute)







mongoose.connect(process.env.MONGO_URI,);

let db = mongoose.connection;
db.on("open", () => {
  console.log("Connection Succesful!");
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`);
  });
});
db.on("error", () => {
  console.log("Connection Fail!");
});
