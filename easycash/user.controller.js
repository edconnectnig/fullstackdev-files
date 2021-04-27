const router = require("express").Router();
const passport = require("passport");

import userService from "./user.service";

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
