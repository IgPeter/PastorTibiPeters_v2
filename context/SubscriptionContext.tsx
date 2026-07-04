import React, {createContext, useEffect, useState, useContext} from 'react';
import {AuthContext} from './AuthContext';
import baseUrl from '../components/url';

export const SubscriptionContext = createContext<any>(null);

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {user} = useContext(AuthContext);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setIsSubscribed(false);
      setLoading(false);
    }
  }, [user]);

  const checkSubscription = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/subscription/status/${user.user._id}`,
      );
      const data = await res.json();
      setIsSubscribed(data.active);
    } catch (e) {
      setIsSubscribed(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        refreshSubscription: checkSubscription,
        loading,
      }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
