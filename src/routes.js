const {
  addBookController,
  getAllBooksController,
  getBooksByIdController,
  editBooksController,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookController,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksController,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdController,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksController,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
