function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.localeCompare(b.name.last));
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((totalBorrows, book) => {
    const borrows = book.borrows;
    const count = borrows.filter(borrow => borrow.id === account.id).length;
    return totalBorrows + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.filter(book => {
    const currentBorrow = book.borrows[0];
    return currentBorrow.id === account.id && !currentBorrow.returned;
  })
  .map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return { ...book, author };
  });}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
