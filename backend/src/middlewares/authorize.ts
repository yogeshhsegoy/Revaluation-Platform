import {NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "yogiman";



function authorize(req: any, res: any, next: NextFunction) {
    const token = req.headers.authorization;
    try{
        //console.log(token)
        const jwtString = token.split(" ")[1];
        //console.log(jwtString);
        const decodedValue= jwt.verify(jwtString, jwtSecret) as JwtPayload;
        //console.log(decodedValue);
        req.headers.organizationId = parseInt(decodedValue.organizationId);
        next()
    }
    catch(error :any){
        console.error('JWT verification failed:', error);
        res.status(401).json({
            msg: "Unauthorized",
            error: error.message,
        });
    }

}


export default authorize;