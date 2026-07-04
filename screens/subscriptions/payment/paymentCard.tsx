import {TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';

type PaymentCardProps = {
  label: string;
  description: string;
  logo: any;
  selected: boolean;
  onPress: () => void;
};

const PaymentCard = ({
  label,
  description,
  logo,
  selected,
  onPress,
}: PaymentCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.paymentCard, selected && styles.paymentCardSelected]}
      activeOpacity={0.85}
      onPress={onPress}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <View>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#404040',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentCardSelected: {
    borderColor: '#d9a407',
    backgroundColor: '#EEF2FF',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#404040',
  },
  cardDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default PaymentCard;
