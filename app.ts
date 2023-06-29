import express, { Express, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import logger from "morgan";

const app: Express = express();

//* DEClaRE PORT
const PORT = process.env.port || 3000;
dotenv.config()
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

app.listen(PORT, () => {
  console.log("listening on port");
});
