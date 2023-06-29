import express, { Express, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import logger from "morgan";
import prisma from "./middlewares/prisma";
import droneRouter from './routes/drone.routes'




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

//ERROR HANDLING MIDDLEWARE
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle the error
  console.error(err.message);


  return res.status(500).send({
    statusCode: 500,
    statusMessage: "Something went wrong",
    data: err.message,
  });
};

//* MIDDLEWARES

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//* USE ROUTES
app.use('/drone', droneRouter)

app.listen(PORT, () => {
  console.log("listening on port");
});
