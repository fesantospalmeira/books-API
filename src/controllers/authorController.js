import mongoose from 'mongoose';
import { author } from '../models/Author.js';

class AuthorController{

  static async listAuthors(req, res){
    try{
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to list authors`});
    }
  }
  static async listAuthorById(req, res){
    try{
      const id = req.params.id;
      const authorFound = await author.findById(id);
      if (authorFound != null){
        res.status(200).json(authorFound);
      } else{
        res.status(404).json({ message:'Author not found.'});
      }
    } catch(erro){
      if(erro instanceof mongoose.Error.CastError){
        res.status(400).json({message: 'Incorrectly entered data.'});

      }else{
        res.status(500).json({message:`${erro.message} - Error to find author.`});
      }
    }
  }

  static async registerAuthor(req, res){
    try{
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: 'Author registered successfully!', author: newAuthor});

    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to register author`});
    }
  }

  static async updateAuthor(req, res){
    try{
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: 'author updated successfully!'});
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to update author`});
    }
  }

  static async deleteAuthor(req, res){
    try{
      const id = req.params.id;
      await author.findByIdAndDelete(id, req.body);
      res.status(200).json({message: 'Author deleted successfully!'});
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to delete author`});
    }
  }

}

export default AuthorController;