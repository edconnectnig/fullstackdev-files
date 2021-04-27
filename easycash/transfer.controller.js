const router = require("express").Router();
const passport = require("passport");

const userService = require("./user.service");

router.post(
  "/transfer",
  passport.authenticate("basic", {
    session: false
  }),
  async (req, res) => {
    const {
      sender,
      recipient,
      amount,
      source,
      note
    } = req.body;

    try {
      const txn = await userService.transfer(
        sender,
        recipient,
        source,
        amount,
        note
      );
      res.json({
        status: "success",
        id: txn._id
      });
    } catch (error) {
      res.json({
        status: "failed",
        error: error.message
      });
    }
  }
);

module.exports = router;