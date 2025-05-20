import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useCustomers } from '@/hooks/useCustomers';
import CustomerCard from '@/components/CustomerCard';
import { Folder, RefreshCw } from 'lucide-react-native';

export default function CustomersScreen() {
  const { customers, isLoading, refreshCustomers } = useCustomers();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshCustomers();
    setRefreshing(false);
  };

  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF"/>
          <Text style={styles.emptyText}>Loading customers...</Text>
        </View>
      );
    }

    return (
        <View style={styles.emptyContainer}>
          <Folder size={64} color="#8E8E93" style={styles.emptyIcon}/>
          <Text style={styles.emptyTitle}>No Customers</Text>
          <Text style={styles.emptyText}>You haven't added any customers yet. Create your first customer to get started.</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/new-customer')}
          ><Text style={styles.emptyButtonText}>Add Customer</Text></TouchableOpacity>
        </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        renderItem={({ item }) => (
          <CustomerCard
            customer={item}
            onPress={() => router.push(`/customers/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {customers.length > 0 && (
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={handleRefresh}
        ><Text style={styles.refreshText}>Refresh</Text><RefreshCw size={16} color="#FFFFFF"/></TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  emptyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  refreshButton: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  refreshText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    marginRight: 8,
  },
});