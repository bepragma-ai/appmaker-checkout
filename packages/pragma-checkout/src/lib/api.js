// You can get setting for each store
import { getOneClickCheckoutUrl } from './oneclick';

export async function getCheckout({ currentCart, accessToken }) {
  console.log('currentCart', currentCart);
  if (!currentCart) {
    return null;
  }
  //get the checkout url from your api
  const checkoutUrl = await getOneClickCheckoutUrl(currentCart);
  console.log('checkoutUrl', checkoutUrl);
  return {
    action: {
      action: 'OPEN_INAPP_PAGE',
      pageId: 'OneClickCheckout',
      pageData: {
        checkoutUrl: checkoutUrl, //pass the checkout url to the page
      },
    },
  };
}
