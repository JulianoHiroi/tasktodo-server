const express = require("express");
const cors = require("cors");
import { router } from "./routes/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(3333, () => {
  console.log("Server listening on PORT 3333");
});
