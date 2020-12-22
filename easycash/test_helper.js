const userService = require("./services/user_service");
const faker = require("faker");

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

module.exports = {
  givenUser,
  givenUserWithBalance,
};
