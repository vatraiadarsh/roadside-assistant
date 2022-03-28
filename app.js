const express = require("express");
const colors = require("colors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.use(express.static(__dirname + "/client/build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
