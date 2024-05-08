import { appmaker, appmakerFunctions } from '@appmaker-xyz/core';
import { getCheckout } from './lib/api.js';
import OneClickCheckout from './pages/oneclickcheckout.js';
import { customPaymentSchema } from './lib/oneclick.js';

const PragmaCheckout = {
  id: 'pragma-checkout',
  name: 'Pragma Checkout',
  activate,
  pages: {
    OneClickCheckout,
  },
};

export function activate(params) {
  console.log("yooooooooo");
  appmakerFunctions.registerAppmakerFn({
    trigger: 'before-open-checkout', // hook to trigger before opening checkout
    namespace: 'oneclick-update-checkout', // namespace for the function
    fn: getCheckout, // map to the function that will be called
  });
  appmaker.addFilter(
    'webview-custom-url-filters', // hook to add custom url filters
    'oneclick-payment-url-filters', // namespace for the filter
    (currentFilters) => {
      return [...currentFilters, customPaymentSchema]; // add the filter to the list of filters
    },
  );
}

appmaker.registerPlugin(PragmaCheckout);
export default PragmaCheckout;
