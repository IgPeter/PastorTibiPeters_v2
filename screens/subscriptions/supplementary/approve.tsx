import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../../components/AppText';

const GOLD = '#d9a407';
const DARK = '#404040';

const Approved = ({navigation}: any): React.JSX.Element => {
  const leftHand = useRef(new Animated.Value(-120)).current;
  const rightHand = useRef(new Animated.Value(120)).current;
  const scaleCheck = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Move hands together 🤝
      Animated.parallel([
        Animated.timing(leftHand, {
          toValue: -20,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rightHand, {
          toValue: 20,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      // Pop checkmark
      Animated.spring(scaleCheck, {
        toValue: 1,
        useNativeDriver: true,
      }),

      // Fade in text
      Animated.timing(fadeText, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Handshake Animation */}
      <View style={styles.handshakeContainer}>
        <Animated.View
          style={[
            styles.hand,
            {
              transform: [{translateX: leftHand}],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.hand,
            {
              transform: [{translateX: rightHand}],
            },
          ]}
        />
      </View>

      {/* Checkmark */}
      <Animated.View
        style={[
          styles.checkCircle,
          {
            transform: [{scale: scaleCheck}],
          },
        ]}>
        <AppText style={styles.checkText}>✓</AppText>
      </Animated.View>

      {/* Text */}
      <Animated.View style={{opacity: fadeText}}>
        <AppText style={styles.title}>Subscription Successful!</AppText>
        <AppText style={styles.subtitle}>
          Thank you for subscribing. You now have full access 🚀
        </AppText>
      </Animated.View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('allMessages')}>
        <AppText style={styles.buttonText}>Continue</AppText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  handshakeContainer: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 30,
  },

  hand: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d9a407',
  },

  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#d9a407',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  checkText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#d9a407',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 3,
  },

  buttonText: {
    color: '#404040',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Approved;
