import {Router} from 'express';
import zod from "zod";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";
const router : Router = Router();
const prisma: PrismaClient= new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "yogiman";

import authorize from "../middlewares/authorize";

const adminInput = zod.object({
    username : zod.string(),
    password: zod.string()
})

const addAdminInput = zod.object({
    name : zod.string(),
    username: zod.string(),
    password : zod.string()
})

const addStudentInput = zod.object({
    name : zod.string(),
    username: zod.string(),
    password : zod.string()
})
const addTeacherInput = zod.object({
    name : zod.string(),
    username: zod.string(),
    password : zod.string()
})

const addSubject = zod.object({
    name : zod.string(),
    subjectCode : zod.string()
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



router.post("/add-admin",authorize,async (req,res)=>{
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const organizationId = req.headers.authorization===undefined?0: parseInt(req.headers.authorization);
    const valid = addAdminInput.safeParse({name,username, password});
    if(valid.success){
        const result = await prisma.admin.findUnique({
            where : {
                username:username
            }
        })
        if(result){
            res.status(401).json({
                msg : "user already exists"
            })
            return;
        }
        await prisma.admin.create({
            data : {
                name : name,
                username : username,
                password : password,
                organizationId : organizationId
            }
        })
        res.status(200).json({
            msg : "success"
        })
    }
})


router.post("/add-teacher", authorize, async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const organizationId = req.headers.authorization === undefined ? 0 : parseInt(req.headers.authorization);

    // Validate input using your custom input validation schema (e.g., addTeacherInput)
    const valid = addTeacherInput.safeParse({ name, username, password });

    if (valid.success) {
        // Check if teacher with the same username already exists
        const result = await prisma.teacher.findUnique({
            where: {
                username: username
            }
        });

        if (result) {
            res.status(401).json({
                msg: "Teacher with this username already exists"
            });
            return;
        }

        // Create the new teacher
        await prisma.teacher.create({
            data: {
                name: name,
                username: username,
                password: password,
                organizationId: organizationId
            }
        });

        res.status(200).json({
            msg: "Teacher added successfully"
        });
    } else {
        res.status(400).json({
            msg: "Invalid input",
            errors: valid.error.errors
        });
    }
});



router.post("/add-student", authorize, async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const organizationId = req.headers.authorization === undefined ? 0 : parseInt(req.headers.authorization);

    // Validate input using your custom input validation schema (e.g., addStudentInput)
    const valid = addStudentInput.safeParse({ name, username, password });

    if (valid.success) {
        // Check if student with the same username already exists
        const result = await prisma.student.findUnique({
            where: {
                username: username
            }
        });

        if (result) {
            res.status(401).json({
                msg: "Student with this username already exists"
            });
            return;
        }

        // Create the new student
        await prisma.student.create({
            data: {
                name: name,
                username: username,
                password: password,
                organizationId: organizationId
            }
        });

        res.status(200).json({
            msg: "Student added successfully"
        });
    } else {
        res.status(400).json({
            msg: "Invalid input",
            errors: valid.error.errors
        });
    }
});



router.post("/add-subject",authorize,async (req,res)=>{
    const name = req.body.name;
    const subjectCode = req.body.subjectCode;
    const organizationId = req.headers.organizationid ? parseInt(req.headers.organizationid as string) : 0;
    const valid = addSubject.safeParse({name,subjectCode});
    if(valid.success){
        const result = await prisma.subject.findUnique({
            where: {
                subjectCode : subjectCode
            }
        });

        if (result) {
            res.status(401).json({
                msg: "Subject with this code already exists"
            });
            return;
        }

        // Create the new student
        await prisma.subject.create({
            data: {
                name : name,
                subjectCode : subjectCode,
                organizationId : organizationId
            }
        });

        res.status(200).json({
            msg: "Subject added successfully"
        });
    }
    else{
        res.status(400).json({
            msg: "Invalid input",
            errors: valid.error.errors
        });
    }
})

router.post("/remove-admin", authorize,async (req,res) => {
    const username = req.body.username;

    if (!username) {
        res.status(400).json({
            msg: "Username is required"
        });
        return;
    }

    // Check if the admin exists
    const admin = await prisma.admin.findUnique({
        where: {
            username: username
        }
    });

    if (!admin) {
        res.status(404).json({
            msg: "Admin not found"
        });
        return;
    }

    // Delete the admin record
    await prisma.admin.delete({
        where: {
            username: username
        }
    });

    res.status(200).json({
        msg: "Admin removed successfully"
    });
})


router.post("/remove-teacher", authorize, async (req, res) => {
    const username = req.body.username;

    if (!username) {
        res.status(400).json({
            msg: "Username is required"
        });
        return;
    }

    // Check if the teacher exists
    const teacher = await prisma.teacher.findUnique({
        where: {
            username: username
        }
    });

    if (!teacher) {
        res.status(404).json({
            msg: "Teacher not found"
        });
        return;
    }

    // Delete the teacher record
    await prisma.teacher.delete({
        where: {
            username: username
        }
    });

    res.status(200).json({
        msg: "Teacher removed successfully"
    });
});


router.post("/remove-student", authorize, async (req, res) => {
    const username = req.body.username;

    if (!username) {
        res.status(400).json({
            msg: "Username is required"
        });
        return;
    }

    // Check if the student exists
    const student = await prisma.student.findUnique({
        where: {
            username: username
        }
    });

    if (!student) {
        res.status(404).json({
            msg: "Student not found"
        });
        return;
    }

    // Delete the student record
    await prisma.student.delete({
        where: {
            username: username
        }
    });

    res.status(200).json({
        msg: "Student removed successfully"
    });
});

router.post("/remove-subject", authorize, async (req, res) => {
    const subjectCode = req.body.subjectCode;

    if (!subjectCode) {
        return res.status(400).json({
            msg: "Subject code is required"
        });
    }

    // Check if the subject exists
    const subject = await prisma.subject.findUnique({
        where: {
            subjectCode: subjectCode
        }
    });

    if (!subject) {
        return res.status(404).json({
            msg: "Subject not found"
        });
    }

    // Delete the subject record
    await prisma.subject.delete({
        where: {
            subjectCode: subjectCode
        }
    });

    res.status(200).json({
        msg: "Subject removed successfully"
    });
});



export default router