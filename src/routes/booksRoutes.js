import express from 'express';
import BookController from '../controllers/bookController.js';
import pagination from '../middlewares/pagination.js';

const routes = express.Router();

routes.get('/books', BookController.listBooks, pagination);
routes.get('/books/search', BookController.findBooksByFilter, pagination);
routes.get('/books/:id', BookController.listBookById);

routes.post('/books', BookController.registerBook);

routes.put('/books/:id', BookController.updateBook);

routes.delete('/books/:id', BookController.deleteBook);

export default routes;
