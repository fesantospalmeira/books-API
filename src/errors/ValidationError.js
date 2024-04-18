import IncorrectRequest from './IncorrectRequest.js';
class ValidationError extends IncorrectRequest{
  constructor(erro){
    const errorMensage = Object.values(erro.errors)
      .map(erro => erro.message)
      .join('; ');
    super(`The following errors were found: ${errorMensage}`);
  }
}
export default ValidationError;