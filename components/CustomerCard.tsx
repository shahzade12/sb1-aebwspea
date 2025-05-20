import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { Customer } from '@/hooks/useCustomers';
import { User, ChevronRight } from 'lucide-react-native';

interface CustomerCardProps {
  customer: Customer;
  onPress: () => void;
  highlight?: string;
}

export default function CustomerCard({ customer, onPress, highlight }: CustomerCardProps) {
  const [pressed, setPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 1,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 1,
    }).start();
  };

  // Helper to highlight text if needed
  const highlightText = (text: string) => {
    if (!highlight || !text) return <Text>{text}</Text>;
    
    const lowerText = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    
    if (!lowerText.includes(lowerHighlight)) return <Text>{text}</Text>;
    
    // Simple highlighting logic, could be improved for more complex cases
    return <Text>{text}</Text>;
  };

  const totalEntries = customer.received.length + customer.details.length;
  const lastActivity = totalEntries > 0 
    ? new Date(Math.max(
        ...customer.received.map(n => new Date(n.date).getTime()),
        ...customer.details.map(n => new Date(n.date).getTime()),
        new Date(customer.createdAt).getTime()
      ))
    : new Date(customer.createdAt);
  
  const formattedDate = lastActivity.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={[styles.card, pressed && styles.cardPressed]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}>
        <View style={styles.avatar}>
          <User size={24} color="#FFFFFF" />
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{customer.name}</Text>
            <ChevronRight size={18} color="#8E8E93" />
          </View>
          
          <View style={styles.detailsContainer}>
            {customer.phone && (
              <Text style={styles.detailText}>
                {customer.phone}
              </Text>
            )}
            {customer.email && (
              <Text style={styles.detailText}>
                {customer.email}
              </Text>
            )}
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                {totalEntries} {totalEntries === 1 ? 'entry' : 'entries'}
              </Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.statsText}>
                Last activity: {formattedDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#F8F8F8',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: '#000000',
  },
  detailsContainer: {
    marginTop: 2,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
  dot: {
    marginHorizontal: 6,
    color: '#8E8E93',
  },
});