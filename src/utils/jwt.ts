import { error } from 'console'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { decode } from 'punycode'

config()

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
  }: {
  payload: string | Buffer | object
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}


export const verifyToken = (
  {token, secretOrPublicKey = process.env.JWT_SECRET as string} : 
  {token: string, secretOrPublicKey?:string}) => {
    console.log(token)
    return new Promise<jwt.JwtPayload>((resolve, reject) => {
      jwt.verify(token, secretOrPublicKey, (error, decode) =>{
        if (error){
          throw reject(error);
        }
        resolve(decode as  jwt.JwtPayload)
      })
    })
}
