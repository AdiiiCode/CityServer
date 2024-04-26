const express = require("express");
const app = express();
const signup = require("./Routes/Signup");
const Home = require("./Routes/Home");
const mongoose = require("mongoose");
const Image = require("./Models/Image");
const multer = require("multer");
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const login = require("./Routes/Login");
const { sendFeedBack } = require("./Routes/SendFeedBack");
const SenderFeedback = require("./Routes/FeedBackSender");
const dbURI =
  "mongodb://rajashariq435:Hello@ac-kxqai3v-shard-00-00.xvodd89.mongodb.net:27017,ac-kxqai3v-shard-00-01.xvodd89.mongodb.net:27017,ac-kxqai3v-shard-00-02.xvodd89.mongodb.net:27017/finder?ssl=true&replicaSet=atlas-932x7h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Finder/src/imgs/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use("/images", express.static("../Finder/src/imgs/"));
var SelectedCityName;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening on Port 5000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
app.use("/signup", signup);
app.use("/login", login);
app.use("/Home/:id", Home);

app.post("/upload-image", upload.single("image"), async (req, res) => {
  imgName = req.file.filename;
  try {
    await Image.create({ im: imgName });
    console.log("Saved img");
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "err" });
  }
});

app.post("/CitnameSelected", async (req, res) => {
  const { CitySelected } = req.body;
  try {
    SelectedCityName = CitySelected;
    res.send({ message: "Success" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/get-image", async (req, res) => {
  try {
    const images = await Image.find({ cn: SelectedCityName });
    if (!images) {
      return res
        .status(404)
        .json({ status: "error", message: "No images found" });
    }
    res.json({ status: "ok", data: images });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.post('/SendFeedBack', SenderFeedback);
