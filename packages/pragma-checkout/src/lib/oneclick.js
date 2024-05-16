import axios from 'axios';
import { encode } from 'base-64';

export const getOneClickCheckoutUrl = async (checkoutObject) => {
  const API_KEY_1C = 'a2b4e755-6990-4fa8-a266-7c44a188df1e';
  let encodedResponse = '';
  let appmakerObject = { appmaker: true, ...checkoutObject };
  await axios
    .post(
      'https://api.1checkout.ai/create',
      JSON.stringify(appmakerObject),
      {
        headers: {
          'Content-type': 'application/json',
          'X-LOGISY-API-KEY': API_KEY_1C,
        },
      },
    )
    .then((response) => {
      // Handle successful response
      const message = {
        checkout_id: response.data.checkout_id,
        checkout_url: response.data.checkout_url,
        notes: null,
      };
      encodedResponse = encode(JSON.stringify(message));
    })
    .catch((error) => {
      // Handle error
      console.error('An error occurred:', error);
    });

  const url = `https://pay.1checkout.ai/v3/checkout/widget/?showerror=false&checkout_type=checkout&containerheight=720&apikey=${API_KEY_1C}&response=${encodedResponse}`; // replace this with your url
  return url;
};

// you can filter the urls that you get in checkout page here
export const customPaymentSchema = {
  id: 'oneclick-payment-schema',
  regex: [
    /phonepe:\/\/pay\?.*/i,
    /paytm:\/\/upi\/pay?.*/i,
    /paytmmp:\/\/pay?.*/i,
    /upi:\/\/pay?.*/i,
    /tez:\/\/upi\/pay?.*/i,
    /.*\.razorpay\.com*/i,
    /.*\.1checkout\.ai*/i,
  ],
  action: (url) => {
    return {
      action: 'OPEN_URL',
      params: {
        url,
      },
    };
  },
};
