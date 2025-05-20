import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useCurrencySettings } from './useCurrencySettings';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  currency?: string;
  amount?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  received: Note[];
  details: Note[];
  createdAt: string;
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const storedCustomers = await AsyncStorage.getItem('customers');
      if (storedCustomers) {
        setCustomers(JSON.parse(storedCustomers));
      }
    } catch (error) {
      console.error('Error loading customers:', error);
      Alert.alert('Error', 'Failed to load customers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveCustomers = async (updatedCustomers: Customer[]) => {
    try {
      await AsyncStorage.setItem('customers', JSON.stringify(updatedCustomers));
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error saving customers:', error);
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    }
  };

  const addCustomer = async (customerData: { 
    name: string;
    phone?: string;
    email?: string;
    address?: string;
  }) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: customerData.name,
      phone: customerData.phone,
      email: customerData.email,
      address: customerData.address,
      received: [],
      details: [],
      createdAt: new Date().toISOString(),
    };

    const updatedCustomers = [...customers, newCustomer];
    await saveCustomers(updatedCustomers);
    return newCustomer;
  };

  const refreshCustomers = async () => {
    await loadCustomers();
  };

  return {
    customers,
    isLoading,
    addCustomer,
    refreshCustomers,
  };
}

export function useCustomer(customerId: string) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { customers, refreshCustomers } = useCustomers();
  const { defaultCurrency } = useCurrencySettings();

  useEffect(() => {
    const foundCustomer = customers.find((c) => c.id === customerId);
    setCustomer(foundCustomer || null);
  }, [customerId, customers]);

  const updateCustomer = async (updatedData: Partial<Customer>) => {
    try {
      const updatedCustomers = customers.map((c) =>
        c.id === customerId ? { ...c, ...updatedData } : c
      );
      
      await AsyncStorage.setItem('customers', JSON.stringify(updatedCustomers));
      await refreshCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
      Alert.alert('Error', 'Failed to update customer. Please try again.');
    }
  };

  const deleteCustomer = async () => {
    try {
      const updatedCustomers = customers.filter((c) => c.id !== customerId);
      await AsyncStorage.setItem('customers', JSON.stringify(updatedCustomers));
      await refreshCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      Alert.alert('Error', 'Failed to delete customer. Please try again.');
    }
  };

  const addEntry = async (section: string, title: string, content: string, currency?: string) => {
    if (!customer) return;

    const newEntry: Note = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString(),
      currency: currency || defaultCurrency,
    };

    const sectionKey = section === 'received' ? 'received' : 'details';
    const updatedEntries = [...customer[sectionKey], newEntry];
    
    const updatedCustomer = {
      ...customer,
      [sectionKey]: updatedEntries,
    };

    const updatedCustomers = customers.map((c) =>
      c.id === customerId ? updatedCustomer : c
    );

    await AsyncStorage.setItem('customers', JSON.stringify(updatedCustomers));
    await refreshCustomers();
  };

  return {
    customer,
    updateCustomer,
    deleteCustomer,
    addEntry,
  };
}