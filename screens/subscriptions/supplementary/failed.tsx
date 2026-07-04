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
const RED = '#d9534f';

const Failed = ({navigation}: any): React.JSX.Element => {
  const leftHand = useRef(new Animated.Value(-20)).current;
  const rightHand = useRef(new Animated.Value(20)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const scaleX = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Shake animation ❌
      Animated.loop(
        Animated.sequence([
          Animated.timing(shake, {
            toValue: 8,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shake, {
            toValue: -8,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shake, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
        {iterations: 2},
      ),

      // Break apart
      Animated.parallel([
        Animated.timing(leftHand, {
          toValue: -140,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rightHand, {
          toValue: 140,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Show X
      Animated.spring(scaleX, {
        toValue: 1,
        useNativeDriver: true,
      }),

      // Fade text
      Animated.timing(fadeText, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Broken handshake */}
      <Animated.View
        style={[
          styles.handshakeContainer,
          {
            transform: [{translateX: shake}],
          },
        ]}>
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
      </Animated.View>

      {/* X icon */}
      <Animated.View
        style={[
          styles.xCircle,
          {
            transform: [{scale: scaleX}],
          },
        ]}>
        <AppText style={styles.xText}>✕</AppText>
      </Animated.View>

      {/* Text */}
      <Animated.View style={{opacity: fadeText}}>
        <AppText style={styles.title}>Payment Failed</AppText>
        <AppText style={styles.subtitle}>
          Your subscription could not be completed. Please try again.
        </AppText>
      </Animated.View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <AppText style={styles.buttonText}>Try Again</AppText>
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
    backgroundColor: GOLD,
    opacity: 0.3,
  },

  xCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  xText: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK,
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
    backgroundColor: GOLD,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 3,
  },

  buttonText: {
    color: DARK,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Failed;
