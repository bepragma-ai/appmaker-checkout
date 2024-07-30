export function isOrderCompleted(url) {
  const regexThankyouPage = /orders\/(.*)$/;
  const isAuthenticatePage = /authenticate/;
  return regexThankyouPage.test(url) && !isAuthenticatePage.test(url);
}

function isAuthenticatePage(url){
  const isAuthenticatePage = /authenticate/;
  return isAuthenticatePage.test(url);
}

const parseQueryString = (queryString) => {
  const params = {};
  const queries = queryString.split('&');

  queries.forEach(query => {
    const [key, value] = query.split('=');
    params[key] = value;
  });

  return params;
};

var params = [];
var orderKey = '';
var orderID = '';

const onUrlChange = (url, onAction) => {
  if(isAuthenticatePage(url)){
    params = parseQueryString(url.split('?')[1]);
    orderKey = params['key'];
    orderID = params['order_id'];
  }

  if (isOrderCompleted(url)) {
    onAction({
      action: 'SET_ORDER_COMPLETE',
      params: {
        orderID,
        orderKey,
      },
    });
  }

  return true;
};

// This function is called when the back button is pressed
const getOnBackButtonPressFunction = ({
  webview,
  onAction,
  canGoBack,
  navigation,
  currentUrl,
}) => {
  return () => {
    // Should return a function
    if (isOrderCompleted(currentUrl)) {
      onAction({
        action: 'RESET',
        replacePage: true,
      });
    } else if (canGoBack) {
      webview.current.goBack();
    } else {
      navigation.goBack();
    }
    return true;
  };
};

const OneClickCheckout = {
  id: 'checkout',
  status: 'active',
  title: 'Checkout',
  attributes: {
    renderType: 'normal',
    contentContainerStyle: { flex: 1 },
    rootContainerStyle: { flex: 1 },
    backButtonIconName: 'x',
  },
  blocks: [
    {
      name: 'appmaker/webview',
      isValid: true,
      clientId: 'f496b61a-56c9-4862-b4a5-d5438bb530aa',
      attributes: {
        loadingLayout: 'home',
        urlListener: onUrlChange, // this function is called when the url changes and can be used to detect when the order is completed
        getOnBackButtonPressFunction, // back button behaviour
        source: {
          uri: '{{blockData.checkoutUrl}}',
        },
      },
    },
  ],
};

export default OneClickCheckout;
