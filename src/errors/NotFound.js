import BaseErro from "./baseError.js";

class NotFound extends BaseErro{
    constructor(message= "Error 404: Page not found"){
        super(message, 404);
    }
}

export default NotFound;