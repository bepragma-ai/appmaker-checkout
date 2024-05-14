import axios from 'axios';
import { encode } from 'base-64';

export const getOneClickCheckoutUrl = async (checkoutObject) => {
  const API_KEY_1C = '817c91a5-4406-4210-893d-53f46a491e03';
  let encodedResponse = '';
  await axios
    .post(
      'https://api.test.1checkout.ai/create',
      // JSON.stringify(checkoutObject),
      {
        token: 'Z2NwLWFzaWEtc291dGhlYXN0MTowMUhQMTQ5QVJLV0IwNEJWRUdRNUIwQjAwVg',
        note: '',
        attributes: { _mrFuncionsEnabled: '1' },
        original_total_price: 77900,
        total_price: 77900,
        total_discount: 0,
        total_weight: 500,
        item_count: 1,
        items: [
          {
            id: 43222020161689,
            properties: {},
            quantity: 1,
            variant_id: 43222020161689,
            key: '43222020161689:e1506e5f91763094835a29dceb6414c6',
            title: '&quot;Honey Bee Floral&quot; Blue Rayon Shirt - S',
            price: 77900,
            original_price: 77900,
            presentment_price: 779,
            discounted_price: 77900,
            line_price: 77900,
            original_line_price: 77900,
            total_discount: 0,
            discounts: [],
            sku: 'GSHSSHT20246BLU_S',
            grams: 500,
            vendor: 'bepragma-demo',
            taxable: true,
            product_id: 7680752287897,
            product_has_only_default_variant: false,
            gift_card: false,
            final_price: 77900,
            final_line_price: 77900,
            url: '/products/products-honey-bee-floral-blue-rayon-shirt?variant=43222020161689',
            featured_image: {
              aspect_ratio: 0.75,
              alt: '"Honey Bee Floral" Blue Rayon Shirt',
              height: 1440,
              url: 'https://cdn.shopify.com/s/files/1/0613/4559/5545/files/GSHSSHT20246BLU_6.jpg?v=1687354864',
              width: 1080,
            },
            image:
              'https://cdn.shopify.com/s/files/1/0613/4559/5545/files/GSHSSHT20246BLU_6.jpg?v=1687354864',
            handle: 'products-honey-bee-floral-blue-rayon-shirt',
            requires_shipping: true,
            product_type: 'Men',
            product_title: '"Honey Bee Floral" Blue Rayon Shirt',
            product_description:
              '\nRayon Fabric\nSuper Comfortable and Breathable Fabric\nRegular Collar\nHalf Sleeves\nFloral Print\nRegular Fit\n',
            variant_title: 'S',
            variant_options: ['S'],
            options_with_values: [{ name: 'Size', value: 'S' }],
            line_level_discount_allocations: [],
            line_level_total_discount: 0,
            has_components: false,
          },
        ],
        requires_shipping: true,
        currency: 'INR',
        items_subtotal_price: 77900,
        cart_level_discount_applications: [],
      },
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

  const url = `https://pay.test.1checkout.ai/v3/checkout/widget/?showerror=false&checkout_type=checkout&containerheight=720&apikey=${API_KEY_1C}&response=${encodedResponse}`; // replace this with your url
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
