import mongoose from 'mongoose';
import BaseErro from '../errors/baseError.js';
import IncorrectRequest from '../errors/IncorrectRequest.js';
import ValidationError from '../errors/ValidationError.js';


//eslint-disable-next-line no-unused-vars
function errorHandle(erro, req, res, next){
  if(erro instanceof mongoose.Error.CastError){ 
    new IncorrectRequest().sendResponse(res);
  } else if(erro instanceof mongoose.Error.ValidationError){
    new ValidationError(erro).sendResponse(res);
  } else if(erro instanceof BaseErro){
      erro.sendResponse(res);
  } else{
    new BaseErro().sendResponse(res);
  }
}

export default errorHandle;