import BaseErro from './baseError.js';

class IncorrectRequest extends BaseErro {
  constructor(mensagem= 'Incorrectly entered data.'){
    super(mensagem, 400);
  }
}

export default IncorrectRequest;