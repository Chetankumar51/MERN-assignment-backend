let express = require("express");
let app = express();
let cors=require("cors");

app.use(cors())
let expresshbr = require("express-handlebars");
let port = 3002;
app.engine("handlebars", expresshbr());
app.set("view engine", "handlebars");

require("./config/db.js");

//Body parser middleware
app.use(express.urlencoded({ extended: true }));
//JSOn Middleware
app.use(express.json());
//user Router
let userRouter = require("./routes/user.js");

//----Router middlewares----------
app.use("/user", userRouter);
//tesing
app.get("/test", (req, res, next) => {
  res.json({
    message: "Test is working",
    data: null,
  });
});

//error handling middlewares
app.use((err, req, res, next) => {
  res.status(500).json({
    error: true,
    message: err.message,
    data: null,
  });
});
app.listen(port, (req, res) => {
  console.log(`server listening at ${port} port`);
});
