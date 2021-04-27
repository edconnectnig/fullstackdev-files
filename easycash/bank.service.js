import axios from "axios";

const debitBankAccount = async (bankName, acctNumber, amount) => {
  try {
    const resp = await axios.post(
      "http://api.flutterwave.com/payment",
      {
        bank_name: bankName,
        acct_number: acctNumber,
        amount: amount,
      },
      {
        headers: {
          client_id: process.env.flutter_client_id,
          client_secret: process.env.flutter_client_secret,
        },
      }
    );
   return resp;
  } catch (error) {
    return {
        status: 'failed',
        error
    }
  }
};

export default {
  debitBankAccount,
};