import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useCurrencySettings } from '@/hooks/useCurrencySettings';
import { X, Save, DollarSign } from 'lucide-react-native';
import CurrencySelector from './CurrencySelector';

interface NewEntryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, currency?: string) => void;
  type: 'note' | 'detail';
}

export default function NewEntryModal({
  visible,
  onClose,
  onSave,
  type,
}: NewEntryModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currency, setCurrency] = useState<string | undefined>(undefined);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  
  const { activeCurrencies, defaultCurrency, getCurrencySymbol } = useCurrencySettings();

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }
    onSave(title, content, currency);
    setTitle('');
    setContent('');
    setCurrency(undefined);
  };

  const handleSelectCurrency = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setShowCurrencySelector(false);
  };

  const modalTitle = type === 'note' 
    ? 'Record New Received Item' 
    : 'Add Customer Detail';

  const contentPlaceholder = type === 'note'
    ? 'Describe what was received, communications, or other interactions...'
    : 'Enter customer detail information...';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}>
                <X size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a title"
                  placeholderTextColor="#A3A3A3"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Content</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder={contentPlaceholder}
                  placeholderTextColor="#A3A3A3"
                  value={content}
                  onChangeText={setContent}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Currency (Optional)</Text>
                <TouchableOpacity
                  style={styles.currencySelector}
                  onPress={() => setShowCurrencySelector(true)}>
                  <Text style={styles.currencyText}>
                    {currency 
                      ? `${getCurrencySymbol(currency)} ${currency}` 
                      : 'Select currency'}
                  </Text>
                  <DollarSign size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </ScrollView>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}>
                <X size={18} color="#8E8E93" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  !title.trim() && styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!title.trim()}>
                <Save size={18} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
      <CurrencySelector
        visible={showCurrencySelector}
        currencies={activeCurrencies.map(id => ({
          id,
          name: `${getCurrencySymbol(id)} ${id}`,
        }))}
        selectedCurrency={currency || defaultCurrency}
        onSelect={handleSelectCurrency}
        onClose={() => setShowCurrencySelector(false)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    maxHeight: 400,
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
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  currencyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#A3A3A3',
  },
  saveButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});