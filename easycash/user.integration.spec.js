/**
 * @jest-environment node
 */

import axios from "axios";

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./server");
const {
  getUser,
  givenUser,
  givenUserWithBankAccount,
} = require("./test.helper");

process.env.flutter_client_id = "test-id";
process.env.flutter_client_secret = "test-secret";

jest.mock("axios");

describe("/api/add-cash: Transfer fund from bank account into cash account", () => {
  // connect to Mongodb memory server started by Jest
  // the connection url is automatically provided by Jest in process.env.MONGO_URL.

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

  afterEach(() => {
    jest.clearAllMocks();
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

    // act
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
    expect(user.balance).toEqual(20000);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.status).toBe("success");
    expect(resp.body.id).not.toBeUndefined();
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

    // act
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
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.error).toBe("Invalid account");
    expect(resp.body.status).toBe("failed");
    expect(resp.body.id).toBeUndefined();
  });

   it("should not update balance if bank transfer fails", async () => {
     axios.post.mockRejectedValueOnce('Insufficient balance');

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
     expect(resp.statusCode).toEqual(200);
     expect(resp.body.error).toBe("Insufficient balance");
     expect(resp.body.status).toBe("failed");
     expect(resp.body.id).toBeUndefined();
   });
});
