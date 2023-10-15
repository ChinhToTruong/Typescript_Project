import { result } from 'lodash';
import { NextFunction, Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/user.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { USER_MESSAGE } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.login(user_id.toString())
  return res.json({
    message: USER_MESSAGE.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await userService.register(req.body)
  return res.json({
    message: USER_MESSAGE.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request, res: Response) => {
  const{ refresh_token} = req.body
  const result = await userService.logout(refresh_token)
  return res.json({
    message: USER_MESSAGE.LOGOUT_SUCCESS_SUCCESS,
    result
  })
}

export const emailVerifyValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decode_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({ 
    _id: new ObjectId(user_id),
  })

  if(!user){
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      messqge: USER_MESSAGE.USER_NOT_FOUND
    })
  }

  // da verify roi thi se khong bao loi 
  //ma se tra ve status ok 
  //voi message da verify
  if(user.email_verify_token === ''){
    return res.json({
      message: USER_MESSAGE.EMAIL_ALREADY_VERIFY
    })
  }

  const result = await userService.verifyEmail(user_id)
  return res.json({
    message: USER_MESSAGE.EMAIL_VERIFY_SUCCESS,
    result
  })
}