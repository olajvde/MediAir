"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const prisma_1 = __importDefault(require("./middlewares/prisma"));
const app = (0, express_1.default)();
//* DEClaRE PORT
const PORT = process.env.port || 3008;
dotenv_1.default.config();
prisma_1.default
    .$connect()
    .then(() => console.log("Connected to database..."))
    .catch((error) => {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
});
//ERROR HANDLING MIDDLEWARE
const errorHandler = (err, req, res, next) => {
    // Handle the error
    console.error(err.message);
    return res.status(500).send({
        statusCode: 500,
        statusMessage: "Something went wrong",
        data: err.message,
    });
};
//* MIDDLEWARES
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("listening on port");
});
