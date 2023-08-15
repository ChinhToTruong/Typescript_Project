import HTTP_STATUS from "~/constants/httpStatus";

type ErrorsType = Record<string,{
  msg : string,
  location : string,
  value : any,
  path : string
  [key: string]: any
} >;

export class ErrorWithStatus {
  message: string;
  status: number;
  constructor({message, status}: {message: string, status: number}){
    this.message = message;
    this.status = status;
  }
}

export class EntityError extends ErrorWithStatus{
  errors: 
  constructor({message, status, errors}: {message: string, status: number, errors: ErrorsType, errors: ErrorsType}){
    super({message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY})
    this.errors = errors;
  }
}