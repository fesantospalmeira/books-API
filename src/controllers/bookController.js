import { author } from '../models/Author.js';
import book from '../models/Book.js';

class BookController{

  static async listBooks(req, res){
    try{
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to list books`});
    }
  }
  static async listBookById(req, res){
    try{
      const id = req.params.id;
      const bookFound = await book.findById(id);
      res.status(200).json(bookFound);
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to find book`});
    }
  }

  static async registerBook(req, res){
    const newBook = req.body ;
    try{
      const authorFound = await author.findById(newBook.author);
      const bookComplete = {...newBook, author: {...authorFound._doc}};
      const bookCreate = await book.create(bookComplete);
      res.status(201).json({ message: 'Book registered successfully!', book: bookCreate});

    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to register book`});
    }
  }

  static async updateBook(req, res){
    try{
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: 'Book updated successfully!'});
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to update book`});
    }
  }

  static async deleteBook(req, res){
    try{
      const id = req.params.id;
      await book.findByIdAndDelete(id, req.body);
      res.status(200).json({message: 'Book deleted successfully!'});
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to delete book`});
    }
  }

  static async findBooksByPublisher(req, res){
    const publisher = req.query.publisher;
    try{
      const booksByPublisher = await book.find({ publisher });
      res.status(200).json(booksByPublisher);
    } catch(erro){
      res.status(500).json({message:`${erro.message} - Error to find books`});
    }
  }

}

export default BookController;