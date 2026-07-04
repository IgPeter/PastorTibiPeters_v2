import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import AppText from '../../../components/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {navigationParamList, paypalLinks} from '../../../components/type';
import baseUrl from '../../../components/url';

type subscriptionPlanType = NativeStackScreenProps<
  navigationParamList,
  'paymentOptions'
>;

const PaymentOptions = ({
  navigation,
  route,
}: subscriptionPlanType): React.JSX.Element => {
  const subscriptionPlan = route.params.subscriptionPlan;
  const user = route.params.user;

  const handlePaystackRecurringPayment = async () => {
    const plan = {
      name: subscriptionPlan.plan,
      interval: 'monthly',
      amount: subscriptionPlan.price * 100,
    };

    const tranData = {
      email: user.user.email,
      amount: plan.amount,
    };

    try {
      const response = await fetch(
        `${baseUrl}/subscription/create-paystack-recurring-order`,
        {
          method: 'POST',
          body: JSON.stringify({plan, tranData}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
    } catch (error) {}
  };

  const handlePaystackOneTimePayment = () => {
    console.log('This is ', subscriptionPlan);
    console.log('This is ', user);

    return;

    fetch(`${baseUrl}/subscription/create-paystack-onetime-order`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  };

  const handlePaypalRecurringPayment = async () => {
    //handle Paypal payment here
    const response = await fetch(
      `${baseUrl}/subscription/create-paypal-recurring-order`,
      {
        method: 'POST',
        body: JSON.stringify(subscriptionPlan),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const {subscriptionDetails} = await response.json();

    console.log(subscriptionDetails);
    if (subscriptionDetails.status == 'APPROVAL_PENDING') {
      Linking.openURL(subscriptionDetails.links[0].href);
    } else {
      Alert.alert('Failed to create subscription');
    }

    //const links = subscriptionDetails.links.find((link : paypalLinks) => link.rel == 'approve')
  };

  const handlePaypalOneTimePayment = () => {
    return;
  };

  return (
    <SafeAreaView style={[styles.container, styles.center]}>
      <View
        style={{
          paddingHorizontal: '4%',
          width: '95%',
          marginBottom: '3%',
          paddingBottom: '5%',
          justifyContent: 'flex-end',
        }}>
        <AppText fontSize={40} style={{fontWeight: 'bold'}}>
          Choose Your Payment Option
        </AppText>
        <AppText>Select how you would like to make your payment</AppText>
      </View>
      <View
        style={[
          {
            width: '95%',
            paddingVertical: '10%',
            borderRadius: 10,
            elevation: 10,
            backgroundColor: '#d9a407',
          },
          styles.center,
        ]}>
        <View
          style={{
            paddingVertical: '3%',
            borderRadius: 5,
            elevation: 2,
            paddingHorizontal: '8%',
            flexDirection: 'row',
            backgroundColor: '#d3992d',
          }}>
          <Image
            source={require('../../assets/icons/recommended.png')}
            style={{width: 30, height: 30}}
          />
          <AppText fontSize={18} style={{color: '#404040', fontWeight: 'bold'}}>
            recommended
          </AppText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: '5%',
            marginBottom: '6%',
            paddingVertical: '4%',
            paddingHorizontal: '10%',
          }}>
          <AppText fontSize={25} style={{fontWeight: 'bold', color: '#404040'}}>
            Recurring Payment
          </AppText>
          <AppText fontSize={20} style={{fontWeight: 'bold', color: '#404040'}}>
            Amount: {subscriptionPlan.price}/month
          </AppText>
        </View>
        <View
          style={{
            width: '90%',
            paddingHorizontal: '10%',
            paddingVertical: '3%',
          }}>
          <AppText
            fontSize={20}
            style={{fontWeight: 'bold', color: '#404040', padding: '1%'}}>
            Cancel Anytime
          </AppText>
          <AppText
            fontSize={20}
            style={{fontWeight: 'bold', color: '#404040', padding: '1%'}}>
            Full Feature Access
          </AppText>
          <AppText
            fontSize={20}
            style={{fontWeight: 'bold', color: '#404040', padding: '1%'}}>
            Convenient Renewal
          </AppText>
        </View>
        <Pressable
          onPress={
            user.user.country == 'Nigeria'
              ? handlePaystackRecurringPayment
              : handlePaypalRecurringPayment
          }
          style={{
            paddingVertical: '5%',
            paddingHorizontal: '12%',
            borderRadius: 10,
            backgroundColor: '#404040',
          }}>
          <AppText fontSize={20} style={{fontWeight: 'bold', color: '#f4f4f4'}}>
            Subcribe Monthly
          </AppText>
        </Pressable>
      </View>
      <View style={{width: '95%', padding: '2%'}}>
        <Pressable
          onPress={
            user.user.country == 'Nigeria'
              ? handlePaystackOneTimePayment
              : handlePaypalOneTimePayment
          }
          style={{
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: '5%',
            paddingHorizontal: '10%',
          }}>
          <AppText fontSize={25} style={{color: '#404040'}}>
            One Time Payment
          </AppText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E0E0E0',
  },

  paymentBoxes1: {
    width: '48%',
    padding: '3%',
    alignItems: 'center',
    marginHorizontal: '1%',
    height: '95%',
  },

  paymentBoxes2: {
    width: '48%',
    padding: '3%',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    marginHorizontal: '1%',
    height: '95%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentOptions;
