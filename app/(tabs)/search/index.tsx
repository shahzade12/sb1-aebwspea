import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useCustomers } from '@/hooks/useCustomers';
import CustomerCard from '@/components/CustomerCard';
import { Search as SearchIcon, X } from 'lucide-react-native';

export default function SearchScreen() {
  const { customers } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(lowercasedQuery) ||
          (customer.email && customer.email.toLowerCase().includes(lowercasedQuery)) ||
          (customer.phone && customer.phone.toLowerCase().includes(lowercasedQuery)) ||
          (customer.address && customer.address.toLowerCase().includes(lowercasedQuery)) ||
          customer.details.some(
            (detail) =>
              detail.title.toLowerCase().includes(lowercasedQuery) ||
              detail.content.toLowerCase().includes(lowercasedQuery)
          ) ||
          customer.received.some(
            (note) =>
              note.title.toLowerCase().includes(lowercasedQuery) ||
              note.content.toLowerCase().includes(lowercasedQuery)
          )
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color="#8E8E93" style={styles.searchIcon}/>
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            ><X size={18} color="#8E8E93"/></TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={filteredCustomers}
        renderItem={({ item }) => (
          <CustomerCard
            customer={item}
            onPress={() => router.push(`/customers/${item.id}`)}
            highlight={searchQuery}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Results</Text>
            <Text style={styles.emptyText}>
              {searchQuery.trim() !== ''
                ? `No customers found matching "${searchQuery}"`
                : 'No customers available. Add your first customer to get started.'}
            </Text>
            {searchQuery.trim() === '' && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push('/new-customer')}
              ><Text style={styles.emptyButtonText}>Add Customer</Text></TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D1D1D6',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
    paddingVertical: 10,
  },
  clearButton: {
    padding: 6,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
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
});