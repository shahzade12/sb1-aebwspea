import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useCurrencySettings } from '@/hooks/useCurrencySettings';
import { Globe, Mail, User, Info, Trash, DollarSign } from 'lucide-react-native';
import CurrencySelector from '@/components/CurrencySelector';
import { useState } from 'react';

export default function SettingsScreen() {
  const { 
    activeCurrencies, 
    toggleCurrency, 
    defaultCurrency, 
    setDefaultCurrency 
  } = useCurrencySettings();
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all customers and settings? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Everything', 
          style: 'destructive',
          onPress: () => {
            // Clear all data functionality would be implemented here
            Alert.alert('Data Cleared', 'All customer data has been deleted');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Settings</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => setShowCurrencySelector(true)}>
          <View style={styles.settingIconContainer}>
            <DollarSign size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Default Currency</Text>
            <Text style={styles.settingValue}>{defaultCurrency}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.currenciesContainer}>
          <Text style={styles.currencyTitle}>Available Currencies</Text>
          
          {[
            { id: 'AFN', name: 'Afghanistan Afghani (AFN)' },
            { id: 'IRR', name: 'Iranian Rial (IRR)' },
            { id: 'USD', name: 'US Dollar (USD)' },
            { id: 'AED', name: 'UAE Dirham (AED)' },
            { id: 'EUR', name: 'Euro (EUR)' },
            { id: 'USDT', name: 'Tether (USDT)' }
          ].map(currency => (
            <View key={currency.id} style={styles.currencyItem}>
              <Text style={styles.currencyName}>{currency.name}</Text>
              <Switch
                value={activeCurrencies.includes(currency.id)}
                onValueChange={() => toggleCurrency(currency.id)}
                trackColor={{ false: '#D1D1D6', true: '#34C759' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <User size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Account</Text>
            <Text style={styles.settingSubtitle}>Manage your profile</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Globe size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Language</Text>
            <Text style={styles.settingValue}>English</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Mail size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Contact Support</Text>
            <Text style={styles.settingSubtitle}>Get help with the app</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Info size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>About</Text>
            <Text style={styles.settingSubtitle}>Version 1.0.0</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.dangerSection}>
        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={handleClearData}>
          <Trash size={20} color="#FFFFFF" />
          <Text style={styles.dangerButtonText}>Clear All Data</Text>
        </TouchableOpacity>
        <Text style={styles.dangerNote}>
          This will permanently delete all customer data and reset your settings.
        </Text>
      </View>
      
      <CurrencySelector
        visible={showCurrencySelector}
        currencies={[
          { id: 'AFN', name: 'Afghanistan Afghani (AFN)' },
          { id: 'IRR', name: 'Iranian Rial (IRR)' },
          { id: 'USD', name: 'US Dollar (USD)' },
          { id: 'AED', name: 'UAE Dirham (AED)' },
          { id: 'EUR', name: 'Euro (EUR)' },
          { id: 'USDT', name: 'Tether (USDT)' }
        ].filter(c => activeCurrencies.includes(c.id))}
        selectedCurrency={defaultCurrency}
        onSelect={(currency) => {
          setDefaultCurrency(currency);
          setShowCurrencySelector(false);
        }}
        onClose={() => setShowCurrencySelector(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#8E8E93',
  },
  currenciesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  currencyTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#000000',
    marginBottom: 12,
    marginTop: 4,
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  currencyName: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#000000',
  },
  dangerSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
  },
  dangerButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  dangerNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 12,
    width: '80%',
  },
});