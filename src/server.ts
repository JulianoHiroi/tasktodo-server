const express = require("express");

import { router } from "./routes/routes";

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3333, () => {
  console.log("Server listening on PORT 3333");
});
