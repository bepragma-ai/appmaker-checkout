export const getOneClickCheckoutUrl = async (checkoutObject) => {
  const API_KEY_1C = '817c91a5-4406-4210-893d-53f46a491e03';
  const url = `https://google.com`; // replace this with your url
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
