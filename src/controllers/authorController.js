
import { author } from '../models/Author.js';

class AuthorController{

  static async listAuthors(req, res, next){
    try{
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);

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
        res.status(404).json({ message:'Author not found.'});
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
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: 'author updated successfully!'});

    } catch(erro){
      next(erro);
    }
  }

  static async deleteAuthor(req, res, next){
    try{
      const id = req.params.id;
      await author.findByIdAndDelete(id, req.body);
      res.status(200).json({message: 'Author deleted successfully!'});

    } catch(erro){
      next(erro);
    }
  }

}

export default AuthorController;