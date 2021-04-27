import passport from "passport";
import { Router } from "express";
import userService from "./user.service";

const router = Router();

/*
Define a new API route /user/add-cash.

This route is called with 
{
  userId: <user's id>
  acctId: <the bank account id>
  amount: <the amount to be add to the user's cash account>
}

If the txn succceeds, it will return { status: "success", id: <the txn_id> },
Otherwise it will return  { status: "failed", "error": <the error message> }
*/
router.post(
  "/user/add-cash",
  passport.authenticate("basic", {
    session: false,
  }),
  async (req, res) => {
    const { userId, acctId, amount } = req.body;
    try {
      const txn = await userService.addCash(userId, acctId, amount);
      res.json({
        status: "success",
        id: txn._id,
      });
    } catch (error) {
      res.json({
        status: "failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;
