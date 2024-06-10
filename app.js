const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  console.log(req.path);
});

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Admin-Rohan:admin_rohan_sharma@cluster0.2vxj1.mongodb.net/at-place-app-DB"
  )
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("server started on port : ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", userRoutes);
