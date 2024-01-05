const bcrypt = require("bcrypt");

const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

hash("1234").then((result) => console.log(result));
