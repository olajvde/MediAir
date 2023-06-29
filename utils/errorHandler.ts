import express, { Express, Request, Response, NextFunction } from "express";


//ERROR HANDLING MIDDLEWARE
export const errorHandler = (
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

