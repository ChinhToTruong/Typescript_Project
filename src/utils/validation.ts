import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { addAbortSignal } from 'stream'
import HTTPSTATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })
    for (const key in errorsObject) {
      const { msg } = errorsObject[key]

      if (msg instanceof ErrorWithStatus && msg.status !== HTTPSTATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      entityError.errors[key] = msg
    }

    res.status(422).json({ errors: errorsObject })
  }
}
