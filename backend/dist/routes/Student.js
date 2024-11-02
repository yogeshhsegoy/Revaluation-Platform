"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "yogiman";
const studentInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
var User;
(function (User) {
    User[User["student"] = 0] = "student";
    User[User["teacher"] = 1] = "teacher";
    User[User["admin"] = 2] = "admin";
})(User || (User = {}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const valid = studentInput.safeParse({ username, password });
    if (valid.success) {
        const result = yield prisma.student.findUnique({
            where: {
                username: username
            }
        });
        if (result) {
            if (result.password === password) {
                const token = jsonwebtoken_1.default.sign({ username, type: User.student }, jwtSecret);
                res.status(200).json({
                    msg: "success",
                    token: token,
                    type: User.student
                });
            }
            else {
                res.status(401).json({
                    msg: "wrong password",
                });
            }
        }
        else {
            res.status(404).json({
                msg: "user does not exist",
            });
        }
    }
    else {
        res.status(400).json({
            msg: "invalid input"
        });
    }
}));
exports.default = router;
