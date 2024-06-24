require("dotenv").config()
const express = require("express")
const cors = require("cors");
const app = express()
const authRoute = require("./router/auth-router")
const contactRoute = require("./router/contact-router")
const serviceRoute = require("./router/service-router")
const adminRoute = require("./router/admin-route")
const connectDb = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
  
app.use(cors(corsOptions));

app.use(express.json()); //for displaying json format languages
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);


app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

const port = 5000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`running at port ${port}`);
  });
});
