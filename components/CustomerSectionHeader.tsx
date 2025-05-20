import { View, Text, StyleSheet } from 'react-native';

interface CustomerSectionHeaderProps {
  title: string;
  count: number;
}

export default function CustomerSectionHeader({ title, count }: CustomerSectionHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
  },
  countContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 2,
  },
  count: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});