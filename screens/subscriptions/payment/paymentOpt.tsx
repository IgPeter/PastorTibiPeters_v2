import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type PaymentOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function PaymentOption({label, selected, onPress}: PaymentOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
      activeOpacity={0.85}
      onPress={onPress}>
      <Text style={styles.optionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  paymentOption: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentOptionSelected: {
    borderColor: '#d9a407',
    backgroundColor: '#EEF2FF',
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#404040',
  },
});

export default PaymentOption;
