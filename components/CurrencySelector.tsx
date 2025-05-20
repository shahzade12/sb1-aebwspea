import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { X, Check } from 'lucide-react-native';

interface Currency {
  id: string;
  name: string;
}

interface CurrencySelectorProps {
  visible: boolean;
  currencies: Currency[];
  selectedCurrency: string;
  onSelect: (currency: string) => void;
  onClose: () => void;
}

export default function CurrencySelector({
  visible,
  currencies,
  selectedCurrency,
  onSelect,
  onClose
}: CurrencySelectorProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Currency</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={currencies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.currencyItem}
                onPress={() => onSelect(item.id)}>
                <Text style={styles.currencyText}>{item.name}</Text>
                {selectedCurrency === item.id && (
                  <Check size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No currencies available. Please enable currencies in Settings.
                </Text>
              </View>
            }
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
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  currencyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
  },
});