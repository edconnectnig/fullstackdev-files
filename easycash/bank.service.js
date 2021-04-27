import axios from "axios";

const debitBankAccount = async (bankName, acctNumber, amount) => {
  try {
    await axios.post(
      "http://api.flutterwave.com/payment",
      {
        bank_name: bankName,
        acct_number: acctNumber,
        amount: amount,
      },
      {
        headers: {
          client_id: process.env.flutter_client_id,
          client_scree: process.env.flutter_client_id,
        },
      }
    );
    return "success";
  } catch (error) {
     return "faied"
  }
};

export default {
  debitBankAccount,
};