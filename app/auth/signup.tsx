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
} from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Phone, User, ArrowLeft } from 'lucide-react-native';

export default function SignupScreen() {
  const [isEmail, setIsEmail] = useState(true);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!name || !identifier || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (isEmail && !identifier.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isEmail && !/^\+?[\d\s-]{8,}$/.test(identifier)) {
      setError('Please enter a valid phone number');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // TODO: Implement actual signup logic
    router.replace('/customers');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to start managing your customers
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
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <User size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </View>
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.footerLink}>Sign In</Text>
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
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
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
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signupButtonText: {
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