const db = require("./connection");

const getPropertyFromDB = (table, column, where) => {
  return db(table).select(column).where(where);
};

const pushDataToDB = (table, insertValue) => {
  return db(table).insert(insertValue).returning("*");
};

const deleteFromDB = (table, where) => {
  return db(table).where(where).del().returning("*");
};

module.exports = { getPropertyFromDB, pushDataToDB, deleteFromDB };
