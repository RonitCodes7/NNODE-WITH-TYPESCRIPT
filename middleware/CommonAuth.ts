import { Request, Response, NextFunction } from "express";
import { AuthValidatorPayload } from "../dto/Auth.dto";
import { verifySignature } from "../utility";

declare global {
    namespace Express {
        interface Request {
            user?: AuthValidatorPayload; // Extend Request to include `user`
        }
    }
}

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validate = await verifySignature(req); // Pass the `req` object
        console.log("Inside middleWare", validate)
        if (validate) {
            return next(); // Proceed to the next middleware
        }
        return res.status(401).json({ message: "Unauthenticated" });
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
