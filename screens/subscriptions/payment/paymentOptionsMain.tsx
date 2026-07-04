import react, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../components/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {navigationParamList, paypalLinks} from '../../../components/type';
import PaymentCard from './paymentCard';
import PaymentOption from './paymentOpt';
import baseUrl from '../../../components/url';
import Error from '../../../components/error';

type subscriptionPlanType = NativeStackScreenProps<
  navigationParamList,
  'paymentOptions'
>;

export default function PaymentOptionsMain({
  navigation,
  route,
}: subscriptionPlanType): React.JSX.Element {
  const [platform, setPlatform] = useState<'paypal' | 'paystack' | null>(null);
  const [paymentType, setPaymentType] = useState<
    'one-time' | 'recurring' | null
  >(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const subscriptionPlan = route.params.subscriptionPlan;
  const user = route.params.user;

  const handleContinue = () => {
    if (platform === 'paypal' && paymentType === 'recurring') {
      handlePaypalRecurringPayment();
    } else if (platform === 'paypal' && paymentType === 'one-time') {
      handlePaypalOneTimePayment();
    } else if (platform === 'paystack' && paymentType === 'recurring') {
      handlePaystackRecurringPayment();
    } else if (platform === 'paystack' && paymentType === 'one-time') {
      handlePaystackOneTimePayment();
    }
  };

  //adding payment handlers functions here
  const handlePaystackRecurringPayment = async () => {
    try {
      setPaymentType('recurring');
      setLoading(true);

      // Check country
      if (user.user.country !== 'Nigeria') {
        setLoading(false);
        setError('Paystack is only available for users in Nigeria');
        return;
      }

      const plan = {
        name: subscriptionPlan.plan,
        interval: 'monthly',
        amount: subscriptionPlan.price * 100, // kobo
      };

      const tranData = {
        email: user.user.email,
        amount: plan.amount,
        userId: user.user.id,
      };

      const response = await fetch(
        `${baseUrl}/subscription/create-paystack-recurring-order`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({plan, tranData}),
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error('Paystack server error:', errText);
      }

      const data = await response.json();

      console.log('Paystack Response Data: ', data);
      // 🔴 Validate response
      if (!data.transaction.data?.authorization_url) {
        console.error('Invalid Paystack response:', data);
        return;
      }

      Linking.openURL(data.transaction.data.authorization_url);
    } catch (err: any) {
      console.error('Paystack recurring error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackOneTimePayment = async () => {
    setPaymentType('one-time');
    setLoading(true);

    if (user.user.country !== 'Nigeria') {
      setError('Paystack is only available for users in Nigeria');
      return;
    }

    const response = await fetch(
      `${baseUrl}/subscription/create-paystack-onetime-order`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: user.user.email,
          amount: subscriptionPlan.price * 100,
          userId: user.user.id,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const paymentData = await response.json();

    console.log('Paystack One-time Payment Data: ', paymentData);
    setLoading(false);
    Linking.openURL(paymentData.authorization_url);
  };

  const handlePaypalRecurringPayment = async () => {
    setPaymentType('recurring');
    setLoading(true);
    console.log(subscriptionPlan);

    const userId = user.user.id;
    // Check country
    if (user.user.country == 'Nigeria') {
      setLoading(false);
      setError('Paypal is only available for users outside Nigeria');
      return;
    }

    //handle Paypal payment here
    const response = await fetch(
      `${baseUrl}/subscription/create-paypal-recurring-order`,
      {
        method: 'POST',
        body: JSON.stringify({subscriptionPlan, userId}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const {subscriptionDetails} = await response.json();
    console.log(subscriptionDetails);

    if (subscriptionDetails.status == 'APPROVAL_PENDING') {
      setLoading(false);
      Linking.openURL(subscriptionDetails.links[0].href);
    } else {
      Alert.alert('Failed to create subscription');
    }

    //const links = subscriptionDetails.links.find((link : paypalLinks) => link.rel == 'approve')
  };

  const handlePaypalOneTimePayment = async () => {
    setPaymentType('one-time');
    setLoading(true);

    // Check country
    if (user.user.country == 'Nigeria') {
      setLoading(false);
      setError('Paypal is only available for users outside Nigeria');
      return;
    }

    const res = await fetch(`${baseUrl}/subscription/create-paypal-order`, {
      method: 'POST',
      body: JSON.stringify(subscriptionPlan),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const orderDetails = await res.json();

    console.log(orderDetails);

    if (orderDetails.status == 'CREATED') {
      const approveLink = orderDetails.links.find(
        (link: any) => link.rel == 'approve',
      );
      if (approveLink) {
        Linking.openURL(approveLink.href);
      }
    }
  };

  return (
    <LinearGradient colors={['#F8FAFC', '#EEF2FF']} style={styles.gradient}>
      <View>
        <Text style={[{fontWeight: 'bold'}, styles.title]}>
          Choose Your Payment Option
        </Text>
        <AppText style={styles.subTitle}>
          Select how you would like to make your payment
        </AppText>
      </View>
      <View style={styles.section}>
        <PaymentCard
          label="PayPal"
          description="For users outside Nigeria"
          logo={require('../../../assets/paypal.png')}
          selected={platform === 'paypal'}
          onPress={() => setPlatform('paypal')}
        />
        <PaymentCard
          label="Paystack"
          description="For users in Nigeria"
          logo={require('../../../assets/paystack.png')}
          selected={platform === 'paystack'}
          onPress={() => setPlatform('paystack')}
        />
      </View>

      {/* Payment Types */}
      {platform && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Payment Type</Text>
          <PaymentOption
            label="One-time Payment"
            selected={paymentType === 'one-time'}
            onPress={() => setPaymentType('one-time')}
          />
          <PaymentOption
            label="Recurring Subscription"
            selected={paymentType === 'recurring'}
            onPress={() => setPaymentType('recurring')}
          />
        </View>
      )}

      {/* Continue Button */}
      <TouchableOpacity
        disabled={!platform || !paymentType}
        onPress={handleContinue}
        style={[
          styles.continueButton,
          {backgroundColor: !platform || !paymentType ? '#CBD5E1' : '#404040'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.continueText}>Continue</Text>
          {loading && <ActivityIndicator color={'#d9a407'} size={20} />}
        </View>
      </TouchableOpacity>
      <Error message={error} style={styles.errorStyle} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    color: '#404040',
    textAlign: 'center',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#404040',
    textAlign: 'center',
    marginBottom: 12,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 16,
  },
  continueText: {
    color: '#d9a407',
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorStyle: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    alignSelf: 'center',
    width: '80%',
    height: 'auto',
    fontSize: 14,
    color: '#B91C1C',
  },
});
