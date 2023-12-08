const express = require("express");
const tenderPoaUi = require("swagger-ui-express");
const tenderPoaSpec = require("./swagger");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 5000;
const cron = require("node-cron");
const {
  updateDueTenders,
  closedTenders,
} = require("./controllers/tenderController");

connectDb();

// Schedule the task to run at midnight (00:00)
cron.schedule("0 0 * * *", () => {
  updateDueTenders();
  closedTenders();
});

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tenders", require("./routes/tenderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.use("/tenderpoa-docs", tenderPoaUi.serve, tenderPoaUi.setup(tenderPoaSpec));
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
