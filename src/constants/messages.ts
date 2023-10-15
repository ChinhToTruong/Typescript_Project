export const USER_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUESTED: 'Name is requested',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENNGTH_MUST_BE_FROM_1_TO_10: 'Name must be from 1 to 10',

  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_ORPASSWORD_IS_INCORRECT: 'Email or password is incorrect',

  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_FROM_6_TO_50: 'Password must be between 6 and 50 characters',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters and must have at least 1 symbol, 1 lowercase, 1 number and upper case characters',

  CONFIRM_PASSWORD_IS_REQUIRED: 'CONFIRM_Password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'CONFIRM_Password must be a string',
  CONFIRM_PASSWORD_MUST_BE_FROM_6_TO_50: 'CONFIRM_Password must be between 6 and 50 characters',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_PASSWORD: 'CONFIRM_Password must be the same password',
  CONFIRM_PASSWORD_MUST_BE_STRONG: 'CONFIRM_Password must be 6-50 characters and must have at least 1 symbol, 1 lowercase, 1 number and upper case characters',

  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date must be in ISO 8601 format',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',

  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',

  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_IS_NOT_EXIT: 'Refresh token is not exist',
  LOGOUT_SUCCESS_SUCCESS: 'Logout successful',

  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFY: 'Email already verified',
  EMAIL_VERIFY_SUCCESS: 'Email verified successfully',
} as const
