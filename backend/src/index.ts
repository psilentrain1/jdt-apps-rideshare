import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes/rideshare.routes";
import * as db from "./utils/db.utils";

const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/", router);

app.listen(PORT, () => {
  db.dbStartupCheck();
  console.log(`App listening on port ${PORT}`);
});
