import { Request,Response ,NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
    user?:any;
}

export const verifyToken = (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{

        const token = req.headers.authorization?.split(" ")[1];
        const secret = process.env.SECRET_KEY as string;

        if(!secret){
            throw new Error("Secret key is not found in Env");
        }
         
        if(!token){
            return res.status(401).json({message:"No token provided"});
        }

        const decoded = jwt.verify(token,secret);

        req.user = decoded;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({message:"Invalid token"});
    }
}