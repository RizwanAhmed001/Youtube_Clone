const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/user.route");

const app = new express();


app.use(express.json());
app.use('/auth', userRoute)







const MONGO_URL =
  "mongodb+srv://Rizwan_Ahmed:rls_YouTube@cluster0.xfthx9w.mongodb.net/youtubeData?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URL);

let db = mongoose.connection;
db.on("open", () => {
  console.log("Connection Succesful!");
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running at port http://localhost:${PORT}`);
  });
});
db.on("error", () => {
  console.log("Connection Fail!");
});
