"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
// enable CORS
const URL = process.env.DATABASE_URL;
console.log("db uRl-->", URL);
console.log("AWS Region:", process.env.AWS_REGION);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Reels Nova Server is running1");
});
// import Routes
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
// auth routes
app.use("/api/v1/auth", authroutes_1.default);
app.use("/api/v1/profile", profile_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
