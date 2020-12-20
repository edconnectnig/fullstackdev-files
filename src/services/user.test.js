/**
 * @jest-environment node
 */
import fs from "fs";
// mock the fs module
jest.mock("fs");

describe("User Service", () => {
  let user;
  
  beforeEach(() => {
    fs.readFileSync.mockReturnValue(`{ "data": ${JSON.stringify(data)} }`);
    user = require("./user");
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("create()", () => {

    test("should create User", () => {
      //setup
      const data = {
        firstname: "foo",
        lastname: "bar",
        email: "foo@gmail.com",
        password: "very-secret",
        matricNumber: "05/0720",
        program: "Computer Technology",
        graduationYear: "2009",
      };
      // act
      const resp = user.create(data);
      // verify;
      expect(resp[0]).toBe(true);
      expect(resp[1].id).not.toBeUndefined();
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
    it("should not create User", () => {
      //setup
      const data = {
        firstname: "foo",
        lastname: "bar",
        email: "foo@gmail.com",
        password: "secret",
        matricNumber: "05/0720",
        program: "Computer Technology",
        graduationYear: "2009",
      };
      // act
      const resp = user.create(data);
      // verify;
      expect(resp[0]).toBe(false);
      expect(resp[1]).toContain("Password should have at least 7 characters");
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });
  describe("getById()", () => {
    it("should return user with specified id", () => {
      // act
      const resp = user.getById("247bdpag3aw");
      // verify
      expect(resp.matricNumber).toEqual("05/0777");
    });
  });
  describe("getAll()", () => {
    it("should return all users", async () => {
      // act
      const resp = await user.getAll();
      // verify
      expect(resp.length).toBe(3);
    });
  });
});

const data = [
  {
    id: "uqdecg701wb",
    firstname: "efe",
    lastname: "amad",
    email: "efe@gmail.com",
    password: "passME123",
    matricNumber: "06/1234",
    program: "comp tech",
    graduationYear: "2020",
  },
  {
    id: "247bdpag3aw",
    firstname: "Tola",
    lastname: "Anjorin",
    email: "tola.anjorin@gmail.com",
    password: "password",
    matricNumber: "05/0777",
    program: "Computer Information Systems",
    graduationYear: "2015",
  },
];
