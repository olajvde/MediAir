import express, { Express, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import logger from "morgan";
import prisma from "./middlewares/prisma";
import droneRouter from "./routes/drone.routes";
import medicationRouter from "./routes/medication.routes";
import errandsRouter from "./routes/errands.routes";
import { errorHandler } from "./utils/errorHandler";

const app: Express = express();

//* DEClARE PORT
const PORT = process.env.port || 3008;
dotenv.config();

prisma
  .$connect()
  .then(() => console.log("Connected to database..."))
  .catch((error: Error) => {
    console.error(`Error connecting to database: ${error.message}`);

    //* PM2 RESTARTS APP ON EXIT
    // process.exit(1);
  });

//* MIDDLEWARES

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//* USE ROUTES
app.use("/drone", droneRouter);
app.use("/medication", medicationRouter);
app.use("/errands", errandsRouter);

app.listen(PORT, () => {
  console.log("listening on port");
});
