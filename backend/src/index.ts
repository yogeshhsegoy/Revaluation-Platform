import express from "express";
import cors from "cors";
import adminRouter from "./routes/Admin"
import studentRouter from "./routes/Student"
import teacherRouter from "./routes/Teacher"
import jwt, {JwtPayload} from "jsonwebtoken";
const app = express();
const port : number = 3000;
const jwtSecret = process.env.JWT_SECRET || "yogiman";


app.use(cors());
app.use(express.json());

app.get("/whoami",(req,res)=>{
    const token = req.headers.authorization as string;
    try{
        console.log(token)
        const jwtString = token.split(" ")[1];
        console.log(jwtString);
        const decodedValue= jwt.verify(jwtString, jwtSecret) as JwtPayload;
        res.status(200).json({
            msg : "success",
            type : decodedValue.type,
        })
    }
    catch(error :any){
        console.error('JWT verification failed:', error);
        res.status(401).json({
            msg: "Unauthorized",
            error: error.message,
        });
    }
})

app.use("/admin",adminRouter);
app.use("/student",studentRouter);
app.use("/teacher",teacherRouter);



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})