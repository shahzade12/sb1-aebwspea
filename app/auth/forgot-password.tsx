import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Phone } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [isEmail, setIsEmail] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!identifier) {
      Alert.alert('Error', 'Please enter your email or phone number');
      return;
    }

    if (isEmail && !identifier.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!isEmail && !/^\+?[\d\s-]{8,}$/.test(identifier)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement password reset logic
      Alert.alert(
        'Success',
        `Password reset instructions have been sent to your ${
          isEmail ? 'email' : 'phone'
        }`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}>
        <ArrowLeft size={24} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address or phone number to reset your password
        </Text>

        <View style={styles.form}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isEmail && styles.toggleButtonActive]}
              onPress={() => setIsEmail(true)}>
              <Mail
                size={20}
                color={isEmail ? '#FFFFFF' : '#8E8E93'}
                style={styles.toggleIcon}
              />
              <Text
                style={[
                  styles.toggleText,
                  isEmail && styles.toggleTextActive,
                ]}>
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isEmail && styles.toggleButtonActive]}
              onPress={() => setIsEmail(false)}>
              <Phone
                size={20}
                color={!isEmail ? '#FFFFFF' : '#8E8E93'}
                style={styles.toggleIcon}
              />
              <Text
                style={[
                  styles.toggleText,
                  !isEmail && styles.toggleTextActive,
                ]}>
                Phone
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {isEmail ? 'Email Address' : 'Phone Number'}
            </Text>
            <View style={styles.inputWrapper}>
              {isEmail ? (
                <Mail size={20} color="#8E8E93" style={styles.inputIcon} />
              ) : (
                <Phone size={20} color="#8E8E93" style={styles.inputIcon} />
              )}
              <TextInput
                style={styles.input}
                placeholder={
                  isEmail ? 'Enter your email' : 'Enter your phone number'
                }
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType={isEmail ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}>
            <Text style={styles.resetButtonText}>
              {isLoading ? 'Sending...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  backButton: {
    margin: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 32,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
  },
  toggleIcon: {
    marginRight: 8,
  },
  toggleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#8E8E93',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 24,
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
  resetButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});