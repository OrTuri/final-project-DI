const db = require("./connection");

const getPropertyFromDB = (table, column, where) => {
  return db(table).select(column).where(where);
};

module.exports = { getPropertyFromDB };
