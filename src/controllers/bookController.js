import NotFound from '../errors/NotFound.js';
import { book, author } from '../models/index.js';

class BookController {

  static async listBooks(req, res, next) {
    try {
      const searchBooks = book.find();

      req.result = searchBooks;

      next();

    } catch (erro) {
      next(erro);

    }
  }
  static async listBookById(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);
      if (bookFound != null) {
        res.status(200).json(bookFound);

      } else {
        next(new NotFound("Book Id not found."))
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listBookByAuthor(req, res, next) {
    try {
      const authorId = req.params.authorId;
      const authorFound = await author.findById(authorId);
      if (!authorFound) {
        return next(new NotFound("Author not found."));
      }
      const booksByAuthor = await book.find({ 'author._id': authorId });

      if (!booksByAuthor || booksByAuthor.length === 0) {
        return next(new NotFound("No books found for this author."));
      }

      res.status(200).json(booksByAuthor);

    } catch (erro) {
      next(erro);
    }
  }

  static async listRecentBooks(req, res, next) {
    try {
      const recentBooks = await book
        .find()
        .sort({ createdAt: -1 })
        .limit(3)

      if (recentBooks != null) {
        res.status(200).json(recentBooks);

      } else {
        next(new NotFound("Book Id not found."))
      }
    } catch (erro) {
      next(erro)
    }
  }

  static async registerBook(req, res, next) {
    const newBook = req.body;

    try {
      const authorFound = await author.findById(newBook.author);
      const bookComplete = { ...newBook, author: { ...authorFound._doc } };
      const bookCreate = await book.create(bookComplete);

      res.status(201).json({ message: 'Book registered successfully!', book: bookCreate });

    } catch (erro) {
      next(erro);

    }
  }

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await book.findByIdAndUpdate(id, req.body);
      if (bookFound != null) {
        res.status(200).json({ message: "Book updated sucessfully!" });

      } else {
        next(new NotFound("Book Id not found."))
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await book.findByIdAndDelete(id, req.body);
      if (bookFound != null) {
        res.status(200).json({ message: "Book deleted sucessfully!" });

      } else {
        next(new NotFound("Book Id not found."))
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async findBooksByFilter(req, res, next) {
    try {
      const search = await processSearch(req.query);

      if (search !== null) {
        const booksByFilter = book
          .find(search)
          .populate("author");

        req.result = booksByFilter;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }

}

async function processSearch(parameters) {
  const { publisher, title } = parameters;

  let search = {};

  //regex com javascript
  const regex = new RegExp(title, "i")
  if (title) search.title = regex;

  //regex com mongodb
  if (publisher) search.publisher = { $regex: publisher, $options: "i" };

  return search;
}

export default BookController;

