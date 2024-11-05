import {Router} from 'express';
import zod from "zod";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";
const router : Router = Router();
const prisma: PrismaClient= new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "yogiman";

const adminInput = zod.object({
    username : zod.string(),
    password: zod.string()
})


enum User{
    student,
    teacher,
    admin
}

router.post("/login",async (req,res)=>{
    const username : string = req.body.username;
    const password: string = req.body.password;
    const valid = adminInput.safeParse({username, password});
    if(valid.success){

        const result = await prisma.admin.findUnique({
            where:{
                username:username
            }
        });

        if(result){
            if(result.password === password){
                const token = jwt.sign({username:username,type:User.admin,name:result.name},jwtSecret);
                res.status(200).json({
                    msg : "success",
                    token : token,
                    type : User.admin,
                    name : result.name,
                })
            }
            else{
                res.status(401).json({
                    msg : "wrong password",
                })
            }
        }
        else{
            res.status(404).json({
                msg : "user does not exist",
            })
        }
    }
    else{
        res.status(400).json({
            msg : "invalid input"
        })
    }
})


export default router