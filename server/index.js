const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dataRoutes = require("./Routes/dataRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const csvToDbService = require("./Services/csvToDbService");
const fileOwner = "index.js";
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use("/api", dataRoutes);

const Mongo_URL = process.env.MONGO_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(Mongo_URL, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
//   .then(() => mongoose.connection.db.dropDatabase())
//   .then(() => csvToDbService.loadDataToDb())
  .catch((err) => {
    console.error(`Error connecting to the database.${err}`);
  });

const server = app.listen(process.env.PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log(
    `CaseStudy Application app listening at http://${host}:${port}`,
    "[fileName:]",
    fileOwner
  );
});
