
import NotFound from '../errors/NotFound.js';
import { author } from '../models/index.js';

class AuthorController{
  static listAuthors(req, res, next){
    try{
      const listAuthors = author.find({});

      req.result = listAuthors;
      next();

    } catch(erro){
      next(erro);
      
    }
  }
  static async listAuthorById(req, res, next){
    try{
      const id = req.params.id;
      const authorFound = await author.findById(id);
      if (authorFound != null){
        res.status(200).json(authorFound);

      } else{
        next(new NotFound("Author Id not found."))
      }
    } catch(erro){
      next(erro);
      
    }
  }

  static async registerAuthor(req, res, next){
    try{
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: 'Author registered successfully!', author: newAuthor});

    } catch(erro){
      next(erro);
    }
  }

  static async updateAuthor(req, res, next){
    try{
      const id = req.params.id;
      const authorFound = await author.findByIdAndUpdate(id, req.body);
      if (authorFound != null){
        res.status(200).json({message: " Author updated sucessfully!"});

      } else{
        next(new NotFound("Author Id not found."))
      }

    } catch(erro){
      next(erro);
    }
  }

  static async deleteAuthor(req, res, next){
    try{
      const id = req.params.id;
      const authorFound = await author.findByIdAndDelete(id, req.body);
      if (authorFound != null){
        res.status(200).json({message: "Author deleted sucessfully!"});

      } else{
        next(new NotFound("Author Id not found."))
      }

    } catch(erro){
      next(erro);
    }
  }

}

export default AuthorController;