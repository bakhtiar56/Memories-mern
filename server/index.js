import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use(helmet());

app.use("/posts", postRoutes); //every route is prefixed with /posts

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.ATLAS_URL;

//connect to the database
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    //Db connected
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  //Server started
  console.log(`Server started on port ${PORT}`);
});
// mongoose.set("useFindAndModify", false);
