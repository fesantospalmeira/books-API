import NotFound from "../errors/NotFound.js";

function manipulator404(req, res, next){
    const erro404 = new NotFound;
    next(erro404);
};

export default manipulator404;