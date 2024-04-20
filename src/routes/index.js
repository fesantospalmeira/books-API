import express from 'express';
import books from './booksRoutes.js';
import author from './authorRoutes.js';

const routes = (app)=>{
  app.route('/').get((req, res)=> res.status(200).send('Server on'));
  app.use(express.json(), 
  books, 
  author);
};

export default routes;