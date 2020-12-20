/**
 * @jest-environment node
 */

import helper from "./mongo_helper";
import mongoose from "mongoose";
import { MongoError } from "mongodb";

const { ValidationError } = mongoose.Error;

describe("MongoHelper", () => {
  test("translates Error objects", () => {
    const errors = helper.translateError(
      new Error("Password should have at least 7 characters")
    );
    expect(errors).toEqual(["Password should have at least 7 characters"]);
  });
  test("translates ValidatorError objects", () => {
    const err = new ValidationError();
    err.errors = {
      firstname: {
        message: "Path `firstname` is required.",
      },
    };
    const errors = helper.translateError(err);
    expect(errors).toEqual(["Firstname is required."]);
  });
  test("translates MongoError objects", () => {
    const err = new MongoError("E11000 duplicate key error collection ...");
    err.code = 11000;
    err.keyPattern = { email: 1 };

    const errors = helper.translateError(err);
    expect(errors).toEqual(["Email already exists."]);
  });
});
