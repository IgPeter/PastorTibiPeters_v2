import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Linking,
  Image,
} from 'react-native';
import AppText from '../../components/AppText';
import CheckBox from '../../components/customCheckBox';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  navigationParamList,
  loginUserData,
  subscriptionPlan,
  checkBoxes,
} from '../../components/type';
import Error from '../../components/error';
import baseUrl from '../../components/url';

type subscriptionNavigation = NativeStackScreenProps<
  navigationParamList,
  'subscription'
>;

const Subscription = ({
  navigation,
  route,
}: subscriptionNavigation): React.JSX.Element => {
  const [user] = useState<loginUserData>(route.params.user);
  const [subscriptionScreen, setSubscriptionScreen] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<subscriptionPlan>({
    plan: '',
    desc: '',
    price: 0,
  });
  const [checkBoxes, setCheckBoxes] = useState<checkBoxes>({
    checkBox1: false,
    checkBox2: false,
    checkBox3: false,
  });
  const [wrongPaymentError, setWrongPaymentError] = useState<string>('');

  const handleSubscription = () => {
    navigation.navigate('paymentOptions', {
      subscriptionPlan: subscriptionPlan,
      user: user,
    });
  };

  const handlePaypalPayment = () => {
    if (user.user.country == 'Nigeria') {
      setWrongPaymentError('For foreign users only');
      return;
    }

    navigation.navigate('paymentOptions', {
      subscriptionPlan: subscriptionPlan,
      user: user,
    });
  };

  const handlePaystackPayment = async () => {
    if (user.user.country != 'Nigeria') {
      setWrongPaymentError('Please use paypal for foreign users');
      return;
    }

    navigation.navigate('paymentOptions', {
      subscriptionPlan: subscriptionPlan,
      user: user,
    });
  };

  //Define the subscription here and  hanlde checkboxes toggle
  const handleCheckBoxPress = (checkBoxName: string) => {
    if (checkBoxName === 'checkBox1') {
      setSubscriptionPlan({
        plan: 'Basic',
        desc: 'A 90 days subscription at N1000 | $20',
        price: user.user.country === 'Nigeria' ? 1000 : 20,
      });

      setCheckBoxes(prevCheckBoxes => ({
        ...prevCheckBoxes,
        [checkBoxName]: !prevCheckBoxes[checkBoxName],
        checkBox2: false,
        checkBox3: false,
      }));
    }

    if (checkBoxName === 'checkBox2') {
      setSubscriptionPlan({
        plan: 'Standard',
        desc: 'A 180 days subscription plan at N2000 | $50',
        price: user.user.country === 'Nigeria' ? 2000 : 50,
      });
      setCheckBoxes(prevCheckBoxes => ({
        ...prevCheckBoxes,
        [checkBoxName]: !prevCheckBoxes[checkBoxName],
        checkBox1: false,
        checkBox3: false,
      }));
    }

    if (checkBoxName === 'checkBox3') {
      setSubscriptionPlan({
        plan: 'Premuim',
        desc: 'A 365 days subscription plan at N3000 | $100',
        price: user.user.country === 'Nigeria' ? 3000 : 100,
      });
      setCheckBoxes(prevCheckBoxes => ({
        ...prevCheckBoxes,
        [checkBoxName]: !prevCheckBoxes[checkBoxName],
        checkBox1: false,
        checkBox2: false,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.paymentModal,
          {display: subscriptionScreen ? 'flex' : 'none'},
        ]}>
        <Pressable
          onPress={() => setSubscriptionScreen(false)}
          style={{width: '100%', alignItems: 'flex-end', padding: '5%'}}>
          <Image
            source={require('../../assets/icons/icons8-close.png')}
            style={{
              marginRight: '10%',
              marginTop: '10%',
              width: 35,
              height: 35,
            }}
          />
        </Pressable>
        <View style={{marginVertical: '38%'}}>
          <Pressable
            onPress={handlePaystackPayment}
            style={[styles.paymentButtons, {backgroundColor: '#44b669'}]}>
            <AppText
              fontSize={21}
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#003087',
              }}>
              PAYSTACK
            </AppText>
            <AppText fontSize={14} style={styles.paymentBtnSmallText}>
              For Nigerian users
            </AppText>
          </Pressable>
          <Pressable
            onPress={handlePaypalPayment}
            style={[styles.paymentButtons, {backgroundColor: '#c9c7c7'}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText
                fontSize={21}
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#003087',
                }}>
                PAY
              </AppText>
              <AppText
                fontSize={21}
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#0070e0',
                }}>
                PAL
              </AppText>
            </View>
            <AppText fontSize={14} style={styles.paymentBtnSmallText}>
              For foreign users
            </AppText>
          </Pressable>
          {subscriptionScreen && (
            <View
              style={{
                width: '100%',
                padding: '5%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Error message={wrongPaymentError} style={{color: '#d9a407'}} />
            </View>
          )}
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.subTextHeader}>
          <AppText style={{fontSize: 27, fontWeight: 'bold'}}>
            Hi{' '}
            {user.user.firstName.charAt(0).toUpperCase() +
              user.user.firstName.slice(1)}{' '}
            Get Started
          </AppText>
          <AppText style={{fontSize: 25, fontWeight: 'bold', color: '#d9a407'}}>
            Unrestricted
          </AppText>
        </View>
        <Pressable
          style={{
            flexDirection: 'row',
            paddingHorizontal: '8%',
            paddingVertical: '4%',
          }}>
          <View style={{width: '70%', padding: '2%'}}>
            <AppText style={{fontSize: 25, fontWeight: 'bold'}}>Basic</AppText>
            <AppText style={{fontSize: 13, fontWeight: 'bold'}}>
              View all messages for one week at N1000 | $20
            </AppText>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <CheckBox
              style={{
                backgroundColor: checkBoxes.checkBox1 ? '#d9a407' : '#f4f4f4',
              }}
              onPress={() => handleCheckBoxPress('checkBox1')}
            />
          </View>
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            paddingHorizontal: '8%',
            paddingVertical: '4%',
          }}>
          <View style={{width: '70%', padding: '2%'}}>
            <AppText style={{fontSize: 25, fontWeight: 'bold'}}>
              Standard
            </AppText>
            <AppText style={{fontSize: 13, fontWeight: 'bold'}}>
              View all messages for one month at N2000 | $50
            </AppText>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <CheckBox
              style={{
                backgroundColor: checkBoxes.checkBox2 ? '#d9a407' : '#f4f4f4',
              }}
              onPress={() => handleCheckBoxPress('checkBox2')}
            />
          </View>
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            paddingHorizontal: '8%',
            paddingVertical: '4%',
          }}>
          <View style={{width: '70%', padding: '2%'}}>
            <AppText style={{fontSize: 25, fontWeight: 'bold'}}>
              Premium
            </AppText>
            <AppText style={{fontSize: 13, fontWeight: 'bold'}}>
              View all messages for one year at N3000 | $100
            </AppText>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <CheckBox
              style={{
                backgroundColor: checkBoxes.checkBox3 ? '#d9a407' : '#f4f4f4',
              }}
              onPress={() => handleCheckBoxPress('checkBox3')}
            />
          </View>
        </Pressable>
        <View
          style={{
            paddingHorizontal: '8%',
            paddingVertical: '4%',
            marginTop: '10%',
            alignItems: 'center',
          }}>
          <Pressable onPress={handleSubscription} style={styles.subscribe}>
            <AppText
              style={{fontSize: 20, color: '#d9a407', fontWeight: 'bold'}}>
              Subscribe
            </AppText>
          </Pressable>
          <Pressable style={styles.freeTrial}>
            <AppText
              style={{fontSize: 20, color: '#d9a407', fontWeight: 'bold'}}>
              Start 7 Da ys Free Trial
            </AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },

  subTextHeader: {
    width: '100%',
    paddingHorizontal: '8%',
    paddingTop: '25%',
    paddingBottom: '4%',
  },
  subscribe: {
    width: '80%',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    alignItems: 'center',
    backgroundColor: '#404040',
    borderRadius: 15,
  },
  freeTrial: {
    width: '100%',
    paddingHorizontal: '4%',
    paddingVertical: '8%',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
  },
  paymentModal: {
    flex: 24,
    borderRadius: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  paymentButtons: {
    width: 180,
    borderRadius: 7,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    marginVertical: '2%',
    elevation: 15,
  },
  paymentBtnSmallText: {
    color: '#E9E4D4',
    textAlign: 'center',
  },
});

export default Subscription;
