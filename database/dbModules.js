const db = require("./connection");

const getPropertyFromDB = (table, column, where) => {
  db(table)
    .select(column)
    .where(where)
    .then((res) => console.log(res));
};

module.exports = { getPropertyFromDB };
