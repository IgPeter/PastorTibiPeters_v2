import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessageView from '../screens/explore/MessageView';
import Login from '../screens/authentication/login';
import Register from '../screens/authentication/register';
import AudioSinglePage from '../screens/single/AudioSinglePage';
import BookSinglePage from '../screens/single/BookSinglePage';
import VideoSinglePage from '../screens/single/VideoSinglePage';
import Subscription from '../screens/subscriptions/subscription';
import AudioPlay from '../screens/play/AudioPlay';
import BookReader from '../screens/play/BookReader';
import VideoPlay from '../screens/play/VideoPlay';
import {navigationParamList} from '../components/type';
import Splash from '../screens/splash/splash';
import Onboarding from '../screens/splash/onboarding';
import PaymentOptions from '../screens/subscriptions/payment/paymentOptionsMain';
import PaypalWebview from '../screens/subscriptions/paypalWebview';
import PaystackWebview from '../screens/subscriptions/paystackWebview';
import Failed from '../screens/subscriptions/supplementary/failed';
import Approved from '../screens/subscriptions/supplementary/approve';

const Stack = createNativeStackNavigator<navigationParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="onboard"
        component={Onboarding}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="main"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="allMessages"
        component={MessageView}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="audioSingle"
        component={AudioSinglePage}
        options={{headerTitle: 'Audio Message'}}
      />

      <Stack.Screen
        name="videoSingle"
        component={VideoSinglePage}
        options={{headerTitle: 'Video Message'}}
      />

      <Stack.Screen
        name="bookSingle"
        component={BookSinglePage}
        options={{headerTitle: 'Read!'}}
      />

      <Stack.Screen
        name="subscription"
        component={Subscription}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="audioPlay"
        component={AudioPlay}
        options={{headerTitle: 'Now Playing'}}
      />

      <Stack.Screen
        name="bookReader"
        component={BookReader}
        options={{headerTitle: 'Reading...'}}
      />

      <Stack.Screen
        name="videoPlay"
        component={VideoPlay}
        options={{headerTitle: 'Now Playing'}}
      />

      <Stack.Screen
        name="paymentOptions"
        component={PaymentOptions}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="paypalWebview"
        component={PaypalWebview}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="paystackWebview"
        component={PaystackWebview}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="failedSubscription"
        component={Failed}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="approvedSubscription"
        component={Approved}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
