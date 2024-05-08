export function isOrderCompleted(url) {
  const regexThankyouPage = /orders\/(.*)$/;
  const isAuthenticatePage = /authenticate/;
  return regexThankyouPage.test(url) && !isAuthenticatePage.test(url);
}

const onUrlChange = (url, onAction) => {
  if (isOrderCompleted(url)) {
    const data = {
      id: 'gid://shopify/Checkout/fecfb108e39c2576698093f3d47c6623?key=f9811df98a255a6f7e48fd97a8e9a792',
      totalPrice: { amount: '549.0', currencyCode: 'INR' },
      lineItems: {
        edges: [
          {
            node: {
              id: 'gid://shopify/CheckoutLineItem/427763830621660?checkout=fecfb108e39c2576698093f3d47c6623',
              title: 'test FAB 5 Glossy 5 in 1 Lipstick 7.5 Gm',
              variant: {
                id: 'gid://shopify/ProductVariant/42776383062166',
                product: {
                  id: 'gid://shopify/Product/7820752486550',
                  vendor: 'test Cosmetics',
                },
                price: { amount: '549.0', currencyCode: 'INR' },
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0597/9422/7350/files/test_Fab5Gloss_ListingPI_01_250x.jpg?v=1696499518',
                },
              },
              quantity: 1,
            },
          },
          {
            node: {
              id: 'gid://shopify/CheckoutLineItem/429380034561500?checkout=fecfb108e39c2576698093f3d47c6623',
              title: 'product test',
              variant: {
                id: 'gid://shopify/ProductVariant/42938003456150',
                product: {
                  id: 'gid://shopify/Product/7875757441174',
                  vendor: '8ml',
                },
                price: { amount: '0.0', currencyCode: 'INR' },
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0597/9422/7350/files/test_01_250x.jpg?v=1696499518',
                },
              },
              quantity: 1,
            },
          },
        ],
      },
      order: {
        id: 'gid://shopify/Order/5445579931798?key=98f3a1edc21e4e02d9f351799a181061',
        orderNumber: 954722,
        name: '2122954722',
        shippingAddress: {
          firstName: 'john',
          lastName: 'doee',
          name: 'john',
          phone: '123456788',
        },
        email: 'test@appmaker.xyz',
      },
    }; // get the checkout data from your order placed API .
    onAction({
      action: 'SET_ORDER_COMPLETE',
      params: {
        checkout: data,
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
