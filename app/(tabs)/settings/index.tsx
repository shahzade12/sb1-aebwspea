import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { useCurrencySettings } from '@/hooks/useCurrencySettings';
import { Globe, Mail, User, Info, Trash, DollarSign, Phone, Lock } from 'lucide-react-native';
import CurrencySelector from '@/components/CurrencySelector';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { 
    activeCurrencies, 
    toggleCurrency, 
    defaultCurrency, 
    setDefaultCurrency 
  } = useCurrencySettings();
  
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [name, setName] = useState('John Doe'); // TODO: Get from auth state
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      // TODO: Implement profile update logic
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditingProfile(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      // TODO: Implement password change logic
      Alert.alert('Success', 'Password changed successfully');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');
    }
  };

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

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        
        {!isEditingProfile ? (
          <>
            <View style={styles.profileInfo}>
              <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                  <User size={32} color="#FFFFFF" />
                </View>
                <View style={styles.profileDetails}>
                  <Text style={styles.profileName}>{name}</Text>
                  <Text style={styles.profileEmail}>{email}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setIsEditingProfile(true)}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.editForm}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Phone size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditingProfile(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleUpdateProfile}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setIsChangingPassword(!isChangingPassword)}>
          <View style={styles.settingIconContainer}>
            <Lock size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Change Password</Text>
            <Text style={styles.settingSubtitle}>Update your password</Text>
          </View>
        </TouchableOpacity>

        {isChangingPassword && (
          <View style={styles.passwordForm}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setIsChangingPassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleChangePassword}>
                <Text style={styles.saveButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

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
        
        <TouchableOpacity 
          style={[styles.dangerButton, styles.logoutButton]}
          onPress={handleLogout}>
          <Text style={styles.dangerButtonText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.dangerNote}>
          Clearing data will permanently delete all customer data and reset your settings.
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
  profileInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#8E8E93',
  },
  editButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#007AFF',
  },
  editForm: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  passwordForm: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    marginTop: 16,
    paddingTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#000000',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
    padding: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#8E8E93',
  },
  saveButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#FFFFFF',
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
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#8E8E93',
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