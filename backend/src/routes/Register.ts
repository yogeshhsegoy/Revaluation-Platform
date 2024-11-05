import {Router} from 'express';
import zod from 'zod';
import {PrismaClient} from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();
const RegisterInput = zod.object({
    organizationName  : zod.string(),
    organizationCode : zod.string(),
    adminUsername : zod.string(),
    adminPassword : zod.string()
})

router.post("/",async (req,res)=>{
    const organizationName : string = req.body.organizationName;
    const organizationCode : string = req.body.organizationCode;
    const adminUsername : string = req.body.adminUsername;
    const adminPassword : string = req.body.adminPassword;
    const valid = RegisterInput.safeParse({organizationName, organizationCode, adminUsername , adminPassword});
    if(valid.success){
        const result = await prisma.organization.findUnique({
            where : {
                code : organizationCode
            }
        })
        if(result){
            res.status(401).json({
                msg : "code already being used, please use a different code"
            })
            return;
        }
        await prisma.organization.create({
            data : {
                code : organizationCode,
                organizationName : organizationName,
                $include : {
                    admin : {
                        create : {

                        }
                    }
                }
            }
        })
    }
    else{
        res.status(400).json({
            msg : "Invalid input"
        })
    }
})


export default router;