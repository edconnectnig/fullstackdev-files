/**
 * @jest-environment node
 */

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server");
const {
  getUser,
  givenUser,
  givenUserWithBalance,
} = require("../../test.helper");

describe("/api/transfer: Transfer from one user to another", () => {

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

  it("should transfer funds succesfully", async () => {
    // setup
    const sender = await givenUserWithBalance(
      {
        password: "secret",
      },
      120000
    );
    let recipient = await givenUser();

    // act
    const resp = await request(app)
      .post("/api/transfer")
      .auth(sender.userid, "secret")
      .send({
        sender: sender.userid,
        recipient: recipient.userid,
        amount: 20000,
      });

    recipient = await getUser(recipient.id)
    expect(recipient.balance).toEqual(20000)

    
    // verify
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.status).toBe("success");
    expect(resp.body.id).not.toBeUndefined();
  });

  it("should fail to transfer fund", async () => {
    // setup
    const sender = await givenUserWithBalance(
      {
        password: "secret",
      },
      10000
    );
    const recipient = await givenUser({});

    // act
    const resp = await request(app)
      .post("/api/transfer")
      .auth(sender.userid, "secret")
      .send({
        sender: sender.userid,
        recipient: recipient.userid,
        amount: 20000,
      });

    // verify
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.status).toBe("failed");
    expect(resp.body.error).toBe("Insufficient balance");
  });
});
