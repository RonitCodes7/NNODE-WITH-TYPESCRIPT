import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { VendorProfile } from "../dto";
import { SECRET_KEY } from "../configuration";
import { AuthValidatorPayload } from "../dto/Auth.dto";
export const generateSalt = async () => {
    return await bcrypt.genSalt();
}
export const generatePassword = async( password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}
export const validatePassword = async( enterredPassword: string, savedPassWord: string, salt: string) => {
    const enterredHash = await bcrypt.hash(enterredPassword, salt)
    if( enterredHash === savedPassWord){
        return true;
    }
    return false;
}
export const generateSignature = ( payload: VendorProfile) => {
const signature = jwt.sign(payload, SECRET_KEY, { expiresIn: "300m"})
return signature;
}

export const verifySignature = async( req: Request) =>{
    const signature = req.get('Authorization')
    if( signature ){
        const payload = jwt.verify(signature.split(" ")[1], SECRET_KEY) as AuthValidatorPayload
        req.user = payload 
        return true;
    }
    return false;
}