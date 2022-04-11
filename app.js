const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const colors = require("colors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();



if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(helmet())



app.use(express.static(__dirname + "/client/build"));
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use("/api", require("./routes/userRoutes"));
app.use('/api/upload', require('./routes/uploadRoutes'));



app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
