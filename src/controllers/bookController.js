import { author } from '../models/Author.js';
import book from '../models/Book.js';

class BookController{

  static async listBooks(req, res, next){
    try{
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch(erro){
      next(erro);
    }
  }
  static async listBookById(req, res, next){
    try{
      const id = req.params.id;
      const bookFound = await book.findById(id);
      res.status(200).json(bookFound);
    } catch(erro){
      next(erro);
    }
  }

  static async registerBook(req, res, next){
    const newBook = req.body ;
    try{
      const authorFound = await author.findById(newBook.author);
      const bookComplete = {...newBook, author: {...authorFound._doc}};
      const bookCreate = await book.create(bookComplete);
      res.status(201).json({ message: 'Book registered successfully!', book: bookCreate});

    } catch(erro){
      next(erro);
    }
  }

  static async updateBook(req, res, next){
    try{
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: 'Book updated successfully!'});
    } catch(erro){
      next(erro);
    }
  }

  static async deleteBook(req, res, next){
    try{
      const id = req.params.id;
      await book.findByIdAndDelete(id, req.body);
      res.status(200).json({message: 'Book deleted successfully!'});
    } catch(erro){
      next(erro);
    }
  }

  static async findBooksByPublisher(req, res, next){
    const publisher = req.query.publisher;
    try{
      const booksByPublisher = await book.find({ publisher });
      res.status(200).json(booksByPublisher);
    } catch(erro){
      next(erro);
    }
  }

}

export default BookController;