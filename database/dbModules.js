const db = require("./connection");

const getPropertyFromDB = (table, column, where) => {
  return db(table).select(column).where(where);
};

const pushDataToDB = (table, insertValue) => {
  return db(table).insert(insertValue).returning("*");
};

module.exports = { getPropertyFromDB, pushDataToDB };
