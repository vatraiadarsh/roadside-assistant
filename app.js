const express = require("express");
const colors = require("colors");
const morgan = require("morgan");

const app = express();
dotenv.config();
connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ testing: "successful ci/cd build for roadside assistence api" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);