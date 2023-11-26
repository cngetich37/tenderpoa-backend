const express = require("express");
const tenderPoaUi = require("swagger-ui-express");
const tenderPoaSpec = require("./swagger");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tenders", require("./routes/tenderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.use("/tenderpoa-docs", tenderPoaUi.serve, tenderPoaUi.setup(tenderPoaSpec));
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
