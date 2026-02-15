import { Request , Response} from "express";
import { validationResult } from "express-validator";

export const handleValidation = (req: Request, res: Response, next: any) =>{
    const errors = validationResult(req); // captura body, params, query
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
}

