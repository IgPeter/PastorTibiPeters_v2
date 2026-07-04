import {SubscribableMixin} from 'react-native';

export interface messageData {
  _id: string;
  title: string;
  description: string;
  contentType: string;
  image: string;
  message: string;
  category: {_id: string};
  isFeatured: boolean;
  dateCreated: {date: {numberLong: string}};
  _v: {numberInt: string};
}

export interface categoryData {
  _id: string;
  name: string;
  color: string;
  _v: {$numberInt: string};
}

export type navigationParamList = {
  splash: undefined;
  onboard: undefined;
  main: undefined;
  register: undefined;
  allMessages: undefined;
  audioSingle: {messageInfo: messageData};
  videoSingle: {messageInfo: messageData};
  bookSingle: {messageInfo: messageData};
  subscription: {user: loginUserData};
  paymentOptions: {subscriptionPlan: subscriptionPlan; user: loginUserData};
  audioPlay: {messageInfo: messageData};
  bookReader: {messageInfo: messageData};
  videoPlay: {messageInfo: messageData};
  paypalWebview: {link: string};
  paystackWebview: undefined;
  failedSubscription: undefined;
  approvedSubscription: undefined;
};

export type loginUserData = {
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    isAdmin: boolean;
    isSubcriiber: boolean;
    password?: string;
    country: string;
    subscription?: {
      plan?: string;
      desc?: string;
      price?: string;
      dateSubscribed?: any;
      subscriberStatus?: string;
    };
    phone?: number;
    avatar?: string;
  };
};

export type subscriptionPlan = {
  plan: string;
  desc: string;
  price: number;
};

export type checkBoxes = {
  checkBox1: boolean;
  checkBox2: boolean;
  checkBox3: boolean;
};

export type paypalLinks = {
  href: string;
  rel: string;
  method: string;
};
