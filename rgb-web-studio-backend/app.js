const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routerModule = require("./src/controllers/routes");
const errorHandler = require("./src/middlewares/errorHandler");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  }),
);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
app.use(express.json());
routerModule.useRouter(app);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
