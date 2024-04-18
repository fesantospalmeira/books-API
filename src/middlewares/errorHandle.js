import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
function errorHandle(erro, req, res, next){
  if(erro instanceof mongoose.Error.CastError){ 
    res.status(400).json({message: 'Incorrectly entered data.'});

  }
  else{
    res.status(500).json({message:`${erro.message} - Error to find author.`});
  }
}

export default errorHandle;


