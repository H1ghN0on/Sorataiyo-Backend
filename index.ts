import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import "./config/db";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/sample", (req: express.Request, res: express.Response) => {
  console.log("right here");
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server deployed");
});
