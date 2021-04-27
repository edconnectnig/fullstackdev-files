/**
 * @jest-environment node
 */

import axios from "axios";

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./server");
const { getUser, givenUserWithBankAccount } = require("./test.helper");

// Set fake env variables to be used in the BankService
process.env.flutter_client_id = "test-id";
process.env.flutter_client_secret = "test-secret";

// Mock the axios library
jest.mock("axios");

// connect to Mongodb memory server started by Jest
// the connection url is automatically provided by Jest in process.env.MONGO_URL
// setup mongoose before running any test.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// disconnect from database after all the tests.
afterAll(async () => {
  await mongoose.disconnect();
});

describe("/api/add-cash: Transfer fund from bank account into cash account", () => {
  // clear the mock after running each test.
  // this ensures that axios mock assertions are isolated to each test.
  afterEach(() => {
    axios.post.mockClear();
  });

  it("should transfer funds succesfully", async () => {
    axios.post.mockResolvedValueOnce({ status: "success" });

    // setup
    let user = await givenUserWithBankAccount(
      {
        password: "secret",
      },
      "GTB",
      "12345"
    );

    // act (TODO)
    const resp = await request(app)
      .post("/api/user/add-cash")
      .auth(user.userid, "secret")
      .send({
        userId: user.userid,
        acctId: user.accounts[1],
        amount: 20000,
      });

    // verify
    user = await getUser(user.id);
    expect(axios.post).toBeCalledWith(
      "http://api.flutterwave.com/payment",
      { bank_name: "GTB", acct_number: "12345", amount: 20000 },
      {
        headers: {
          client_id: "test-id",
          client_secret: "test-secret",
        },
      }
    );
    // TODO
    expect(user.balance).toEqual(20000);
    expect(resp.body.status).toBe("success");
  });

  it("should throw error for cash account", async () => {
    // setup
    let user = await givenUserWithBankAccount(
      {
        password: "secret",
      },
      "GTB",
      "123456"
    );

    // act (TOD)
    const resp = await request(app)
      .post("/api/user/add-cash")
      .auth(user.userid, "secret")
      .send({
        userId: user.userid,
        acctId: user.accounts[0],
        amount: 20000,
      });

    // verify
    user = await getUser(user.id);
    expect(axios.post).not.toHaveBeenCalled();
    expect(user.balance).toEqual(0);
    expect(resp.body.error).toBe("Invalid account");
    expect(resp.body.status).toBe("failed");
  });

  it("should not update balance if bank transfer fails", async () => {
    // TODO
    axios.post.mockRejectedValueOnce("Insufficient balance");

    // setup
    let user = await givenUserWithBankAccount(
      {
        password: "secret",
      },
      "GTB",
      "123456"
    );

    // act
    const resp = await request(app)
      .post("/api/user/add-cash")
      .auth(user.userid, "secret")
      .send({
        userId: user.userid,
        acctId: user.accounts[1],
        amount: 15000,
      });

    // verify
    user = await getUser(user.id);
    expect(axios.post).toHaveBeenCalled();
    expect(user.balance).toEqual(0);
    expect(resp.body.error).toBe("Insufficient balance");
    expect(resp.body.status).toBe("failed");
  });
});

const expect_ = expect;
beforeAll(() => {
  expect = jest.fn().mockImplementation((arg) => expect_(arg));
});

describe(" Validate", () => {
  // it("should valid assertations", () => {
  //   const calls = expect.mock.calls.map(call => call[0]);
  //   console.log(calls)
  //   expect_(calls[0]).toEqual(axios.post)
  // });
  it("should have valid implementation", async () => {
    axios.post
      .mockResolvedValueOnce({ status: "success" })
      .mockRejectedValue("No funds");

    // setup
    let user = await givenUserWithBankAccount(
      {
        password: "secret",
      },
      "Sterling",
      "12345"
    );

    console.log(user);

    let resp = await request(app)
      .post("/api/user/add-cash")
      .auth(user.userid, "secret")
      .send({
        userId: user.userid,
        acctId: user.accounts[1],
        amount: 20000,
      });

    // verify
    user = await getUser(user.id);
    expect(axios.post).toBeCalledWith(
      "http://api.flutterwave.com/payment",
      { bank_name: "Sterling", acct_number: "12345", amount: 20000 },
      {
        headers: {
          client_id: "test-id",
          client_secret: "test-secret",
        },
      }
    );

    expect(user.balance).toEqual(20000);
    expect(resp.body.status).toBe("success");

    resp = await request(app)
      .post("/api/user/add-cash")
      .auth(user.userid, "secret")
      .send({
        userId: user.userid,
        acctId: user.accounts[1],
        amount: 10000,
      });

    user = await getUser(user.id);
    expect(user.balance).toEqual(20000);
    expect(resp.body.error).toBe("No funds");
  });
});
