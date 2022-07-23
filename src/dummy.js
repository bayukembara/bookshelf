const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBooks);
  const success = books.filter((book) => book.id === id).length > 0;
  if (success) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(501);
  return response;
};
const getBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const booksFilter = books.filter(
      (book) => book.name.toUpperCase().includes(name.toUpperCase()),
    );
    const filteredBooks = booksFilter.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks,
      },
    });
    response.code(200);
    return response;
  }
  if (reading) {
    if (reading === 1) {
      return {
        status: 'success',
        data: {
          books: books.filter((book) => book.reading === 1).map((book) => (
            {
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            }
          )),
        },
      };
    }
    return {
      status: 'success',
      data: {
        books: books.filter((book) => book.reading === 0).map((book) => (
          {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    };
  }
  if (finished) {
    if (finished === 1) {
      return {
        status: 'success',
        data: {
          books: books.filter((book) => book.finished === 1).map((book) => (
            {
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
    return {
      status: 'success',
      data: {
        books: books.filter((book) => book.finished === 0).map((book) => (
          {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    };
  }
  const response = h.response({
    status: 'success',
    data: {
      books: [],
    },
  });
  response.code(200);
  return response;
};
const showBooks = (request, h) => {
  const { id } = request.params;
  const book = books.filter((buku) => buku.id === id)[0];
  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    messsage: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
const putBooks = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === id);
  if (index < 0) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};
const deleteBooks = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((note) => note.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addBooks,
  getBooks,
  showBooks,
  putBooks,
  deleteBooks,
};
