"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Admin_1 = __importDefault(require("./routes/Admin"));
const Student_1 = __importDefault(require("./routes/Student"));
const Teacher_1 = __importDefault(require("./routes/Teacher"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const port = 3000;
const jwtSecret = process.env.JWT_SECRET || "yogiman";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/whoami", (req, res) => {
    const token = req.headers.authorization;
    try {
        console.log(token);
        const jwtString = token.split(" ")[1];
        console.log(jwtString);
        const decodedValue = jsonwebtoken_1.default.verify(jwtString, jwtSecret);
        res.status(200).json({
            msg: "success",
            type: decodedValue.type,
        });
    }
    catch (error) {
        console.error('JWT verification failed:', error);
        res.status(401).json({
            msg: "Unauthorized",
            error: error.message,
        });
    }
});
app.use("/admin", Admin_1.default);
app.use("/student", Student_1.default);
app.use("/teacher", Teacher_1.default);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
