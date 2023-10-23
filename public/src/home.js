function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sortedGenres = Object.entries(genreCount).map(([name, count]) => ({
    name,
    count,
  }));

  sortedGenres.sort((a, b) => b.count - a.count);

  return sortedGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const sortedBooks = books
    .map(book => ({
      name: book.title,
      count: book.borrows.length,
    }))
    .sort((a, b) => b.count - a.count);

  return sortedBooks.slice(0, 5); 
}

function getMostPopularAuthors(books, authors) {
  const authorBorrows = authors.map(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const borrowCount = authorBooks.reduce(
      (acc, book) => acc + book.borrows.length,
      0
    );
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount,
    };
  });

  const sortedAuthors = authorBorrows.sort((a, b) => b.count - a.count);

  return sortedAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
