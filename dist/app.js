"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const prisma_1 = __importDefault(require("./middlewares/prisma"));
const drone_routes_1 = __importDefault(require("./routes/drone.routes"));
const medication_routes_1 = __importDefault(require("./routes/medication.routes"));
const errands_routes_1 = __importDefault(require("./routes/errands.routes"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
//* DEClARE PORT
const PORT = process.env.port || 3008;
dotenv_1.default.config();
prisma_1.default
    .$connect()
    .then(() => console.log("Connected to database..."))
    .catch((error) => {
    console.error(`Error connecting to database: ${error.message}`);
    //* PM2 RESTARTS APP ON EXIT
    // process.exit(1);
});
//* MIDDLEWARES
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(errorHandler_1.errorHandler);
//* USE ROUTES
app.use("/drone", drone_routes_1.default);
app.use("/medication", medication_routes_1.default);
app.use("/errands", errands_routes_1.default);
app.listen(PORT, () => {
    console.log("listening on port");
});
