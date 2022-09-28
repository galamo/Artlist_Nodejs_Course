import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface MyJwt extends JwtPayload {
    isAdmin: boolean;
}


export default function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (authHeader) {
        jwt.verify(authHeader, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                res.status(401).send("User is Not Authorized")
            } else {
                const { isAdmin } = decoded as MyJwt
                req["isAdmin"] = isAdmin;
                return next()
            }
        })
    } else {
        res.status(401).send("User is Not Authorized")
    }
}