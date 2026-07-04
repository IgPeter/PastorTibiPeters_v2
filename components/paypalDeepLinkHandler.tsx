import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import baseUrl from './url';

function getParam(url: string, name: string) {
  const match = url.match(new RegExp(`[?&]${name}=([^&]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

const DeepLinkHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = async ({url}: {url: string}) => {
      console.log('Deep link received:', url);

      // ================= PAYPAL =================
      if (
        url.startsWith('pastortibipetersonline://paypal/subscription/approved')
      ) {
        const subscriptionId = getParam(url, 'subscription_id');
        if (!subscriptionId) return;

        const response = await fetch(
          `${baseUrl}/subscription/verify-paypal-subscription`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({subscriptionId}),
          },
        );

        const {result} = await response.json();

        if (result.subscriptionStatus === 'ACTIVE') {
          navigation.navigate('approvedSubscription' as never);
        } else {
          navigation.navigate('failedSubscription' as never);
        }
        return;
      }

      if (url.startsWith('pastortibipetersonline://paypal/charge/success')) {
        const orderId = getParam(url, 'order_id');
        if (!orderId) return;

        const res = await fetch(`${baseUrl}/payment/verify-paypal-charge`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({orderId}),
        });

        const data = await res.json();

        if (data.success) {
          navigation.navigate('allMessages' as never);
        } else {
          navigation.navigate('subscription' as never);
        }
        return;
      }

      // ================= PAYSTACK =================
      if (url.startsWith('pastortibipetersonline://paystack/charge/success')) {
        const reference = getParam(url, 'reference');
        if (!reference) return;

        const res = await fetch(
          `${baseUrl}/subscription/verify-paystack-payment`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({reference}),
          },
        );

        const data = await res.json();

        if (data.success) {
          navigation.navigate('approvedSubscription' as never);
        } else {
          navigation.navigate('failedSubscription' as never);
        }

        return;
      }

      if (
        url.startsWith('pastortibipetersonline://paystack/subscription/success')
      ) {
        const reference = getParam(url, 'reference');
        if (!reference) return;

        const res = await fetch(
          `${baseUrl}/subscription/verify-paystack-recurring-subscription`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({reference}),
          },
        );

        const data = await res.json();

        if (data.success) {
          navigation.navigate('approvedSubscription' as never);
        } else {
          navigation.navigate('failedSubscription' as never);
        }

        return;
      }

      // ================= CANCELS =================
      if (url.includes('/cancel')) {
        navigation.navigate('subscription' as never);
        return;
      }
    };

    const sub = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url});
    });

    return () => sub.remove();
  }, []);

  return null;
};

export default DeepLinkHandler;
