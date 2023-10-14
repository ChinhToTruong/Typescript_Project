import { decode } from 'punycode';
import { hashPassword } from '~/utils/crypto';
import { USER_MESSAGE } from '~/constants/messages';
import { checkSchema } from 'express-validator'
import userService from '~/services/user.services'
import { validate } from '~/utils/validation'
import {ErrorWithStatus} from '~/models/Errors'
import databaseService from '~/services/database.services';
import { verifyToken } from '~/utils/jwt';
import HTTP_STATUS from '~/constants/httpStatus';
import { verify } from 'crypto';
export const loginValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value, {req}) => {
          const user = await databaseService.users.findOne({ email: value, password: hashPassword(req.body.password)})

          if (user === null) {
            throw new ErrorWithStatus({message: USER_MESSAGE.EMAIL_ORPASSWORD_IS_INCORRECT, status: 400})
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_FROM_6_TO_50
      },
      isStrongPassword: {
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG,
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        }
      }
    },
  }, ['body'])
)

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: USER_MESSAGE.NAME_IS_REQUESTED
      },
      isString: {
        errorMessage: USER_MESSAGE.NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: USER_MESSAGE.NAME_LENNGTH_MUST_BE_FROM_1_TO_10
      },
      trim: true
    },
    email: {
      notEmpty: {
        errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
      },
      isEmail: {
        errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await userService.checkEmailExist(value)
          if (isExistEmail) {
            throw new ErrorWithStatus({message: USER_MESSAGE.EMAIL_ALREADY_EXISTS, status: 400})
          }
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_FROM_6_TO_50
      },
      isStrongPassword: {
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG,
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        }
      }
    },
    confirm_password: {
      notEmpty: {
        errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_FROM_6_TO_50
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        },
        errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_THE_SAME_PASSWORD)
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: USER_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
      }
    }
  }, ['body'])
)

export const accessTokenValidator = validate(
  checkSchema({
    Authorization: {
      notEmpty:{
        errorMessage: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED
      },
      custom:{
        options: async (value: string, {req}) => {
          const access_token = value.split(' ')[1]
          if( !access_token){
            throw new ErrorWithStatus({
              message: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED, 
              status: HTTP_STATUS.UNAUTHORIZED})
          }

          const decode_authorization = await verifyToken({token: access_token})
          req.decode_authorization = decode_authorization
          return true
        }
      }
    }
  }, ['headers'])
)


export const refreshTokenValidator = validate(
  checkSchema({
    refresh_token:{
      notEmpty: {
        errorMessage:  USER_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
      },
      custom: {
        options:async (value: string, {req}) => {
          try {
            const[decode_refresh_token, refresh_token] = await Promise.all([
              verifyToken({token: value}),
              databaseService.refreshToken.findOne({token: value})
            ])
            console.log(refresh_token);
            if (refresh_token === null){
              throw new ErrorWithStatus({
                message: USER_MESSAGE.REFRESH_TOKEN_IS_NOT_EXIT,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            req.decode_refresh_token = decode_refresh_token
          } catch (error) {
            console.log(error);
            throw new ErrorWithStatus({
              message: USER_MESSAGE.REFRESH_TOKEN_IS_INVALID,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          return true
        }
      }
    }
  },['body'])
)
