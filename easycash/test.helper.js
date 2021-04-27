import userService from "./user.service";
import User from "./user.model";
import faker from "faker";

/**
 * Return user with id
 * @param {string} id 
 * @returns 
 */
const getUser = async (id) => await User.findById(id);

/**
 * Create a new user account with a bank account.
 * @param {Object} data 
 * @param {string bankName 
 * @param {string} acctNumber 
 * @returns {User}
 */
const givenUserWithBankAccount = async (
  data,
  bankName,
  acctNumber
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
  givenUserWithBankAccount,
};
