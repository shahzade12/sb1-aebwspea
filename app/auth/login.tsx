import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Phone } from 'lucide-react-native';

export default function LoginScreen() {
  const [isEmail, setIsEmail] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!identifier || !password) {
      setError('Please fill in all fields');
      return false;
    }

    if (isEmail && !identifier.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!isEmail && !/^\+?[\d\s-]{8,}$/.test(identifier)) {
      setError('Please enter a valid phone number');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual login logic here
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/customers');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue managing your customers
          </Text>
        </View>

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
            <View style={[styles.inputWrapper, error && styles.inputError]}>
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
                onChangeText={(text) => {
                  setIdentifier(text);
                  setError('');
                }}
                keyboardType={isEmail ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
                autoComplete={isEmail ? 'email' : 'tel'}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrapper, error && styles.inputError]}>
              <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
                secureTextEntry
                autoComplete="password"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/auth/forgot-password')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}>
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
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
    marginBottom: 20,
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
  inputError: {
    borderColor: '#FF3B30',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#007AFF',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#8E8E93',
  },
  footerLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#007AFF',
  },
});