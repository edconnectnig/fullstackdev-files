import userService from "./user.service";
const User = require("./user.model");
const faker = require("faker");

const getUser = async (id) => await User.findById(id);

const givenUser = async (data) => {
  const user = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    userid: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...data,
  };
  return await userService.register(
    user.firstname,
    user.lastname,
    user.userid,
    user.email,
    user.password
  );
};

const givenUserWithBalance = async (data, balance) => {
  data = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    userid: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...data,
  };
  const user = await userService.register(
    data.firstname,
    data.lastname,
    data.userid,
    data.email,
    data.password
  );
  await user.increaseBalance(balance);
  return user;
};

const givenUserWithBankAccount = async (
  data,
  bankName = "GTB",
  acctNumber = "12345678"
) => {
  data = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    userid: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...data,
  };
  let user = await userService.register(
    data.firstname,
    data.lastname,
    data.userid,
    data.email,
    data.password
  );
  user = await userService.addBankAccount(user.userid, bankName, acctNumber);
  return user;
};

module.exports = {
  getUser,
  givenUser,
  givenUserWithBalance,
  givenUserWithBankAccount,
};
