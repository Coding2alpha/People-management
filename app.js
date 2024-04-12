const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const personRouter = require("./routes/person");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To People-Management-System");
});

app.use("/person", personRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connect with database");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
