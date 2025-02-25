import jwt, { Jwt } from "jsonwebtoken"

const secret = process.env.JWT_SECRET || "cooking-secret"

export const createToken = (data: any) => {
    const token = jwt.sign(data, secret)
    return token
}

export const readToken = (token: string): any => {
    const data = jwt.verify(token, secret)
    return data
}