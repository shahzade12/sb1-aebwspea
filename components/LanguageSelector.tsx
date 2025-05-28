import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { X, Check } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';

interface Language {
  id: 'en' | 'fa';
  name: string;
}

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const languages: Language[] = [
  { id: 'en', name: 'English' },
  { id: 'fa', name: 'فارسی' },
];

export default function LanguageSelector({
  visible,
  onClose,
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleSelectLanguage = async (selectedLanguage: 'en' | 'fa') => {
    await setLanguage(selectedLanguage);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('settings.language')}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={languages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageItem}
                onPress={() => handleSelectLanguage(item.id)}>
                <Text style={styles.languageText}>{item.name}</Text>
                {language === item.id && (
                  <Check size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
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
    paddingTop: 20,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 40,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  languageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
});