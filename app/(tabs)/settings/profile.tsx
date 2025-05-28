import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Save, User, Mail, Phone, Lock } from 'lucide-react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('John Doe'); // TODO: Get from auth state
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement profile update logic
      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdateProfile}
          disabled={isLoading}>
          <Save size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: '#000000',
  },
  backButton: {
    padding: 4,
  },
  saveButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
    marginBottom: 16,
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
});