import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_CURRENCIES = ['AFN', 'IRR', 'USD', 'AED', 'EUR', 'USDT'];
const DEFAULT_CURRENCY = 'USD';

export function useCurrencySettings() {
  const [activeCurrencies, setActiveCurrencies] = useState<string[]>(DEFAULT_CURRENCIES);
  const [defaultCurrency, setDefaultCurrency] = useState<string>(DEFAULT_CURRENCY);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedActiveCurrencies = await AsyncStorage.getItem('activeCurrencies');
      const storedDefaultCurrency = await AsyncStorage.getItem('defaultCurrency');
      
      if (storedActiveCurrencies) {
        setActiveCurrencies(JSON.parse(storedActiveCurrencies));
      }
      
      if (storedDefaultCurrency) {
        setDefaultCurrency(storedDefaultCurrency);
      }
    } catch (error) {
      console.error('Error loading currency settings:', error);
    }
  };

  const saveActiveCurrencies = async (currencies: string[]) => {
    try {
      await AsyncStorage.setItem('activeCurrencies', JSON.stringify(currencies));
      setActiveCurrencies(currencies);
      
      // If the default currency is no longer active, reset it to the first active currency
      if (!currencies.includes(defaultCurrency) && currencies.length > 0) {
        await AsyncStorage.setItem('defaultCurrency', currencies[0]);
        setDefaultCurrency(currencies[0]);
      }
    } catch (error) {
      console.error('Error saving active currencies:', error);
    }
  };

  const saveDefaultCurrency = async (currency: string) => {
    try {
      await AsyncStorage.setItem('defaultCurrency', currency);
      setDefaultCurrency(currency);
    } catch (error) {
      console.error('Error saving default currency:', error);
    }
  };

  const toggleCurrency = (currencyId: string) => {
    if (activeCurrencies.includes(currencyId)) {
      // Don't allow removing the last currency
      if (activeCurrencies.length === 1) {
        return;
      }
      
      // If removing the default currency, update default currency to first remaining one
      if (currencyId === defaultCurrency) {
        const newDefault = activeCurrencies.find(c => c !== currencyId) || DEFAULT_CURRENCY;
        saveDefaultCurrency(newDefault);
      }
      
      saveActiveCurrencies(activeCurrencies.filter(c => c !== currencyId));
    } else {
      saveActiveCurrencies([...activeCurrencies, currencyId]);
    }
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'AED':
        return 'د.إ';
      case 'AFN':
        return '؋';
      case 'IRR':
        return '﷼';
      case 'USDT':
        return '₮';
      default:
        return currency;
    }
  };

  return {
    activeCurrencies,
    defaultCurrency,
    toggleCurrency,
    setDefaultCurrency: saveDefaultCurrency,
    getCurrencySymbol,
  };
}