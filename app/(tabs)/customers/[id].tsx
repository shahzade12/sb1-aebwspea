import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Animated, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useCustomer } from '@/hooks/useCustomers';
import { ArrowLeft, Save, Trash2, CreditCard as Edit, Plus, FileText } from 'lucide-react-native';
import CustomerSectionHeader from '@/components/CustomerSectionHeader';
import NoteItem from '@/components/NoteItem';
import DetailsItem from '@/components/DetailsItem';
import NewEntryModal from '@/components/NewEntryModal';
import generatePdf from '@/components/pdf/pdfGenerator';

export default function CustomerDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { customer, updateCustomer, deleteCustomer, addEntry } = useCustomer(id as string);
  const [activeTab, setActiveTab] = useState('received');
  const [modalVisible, setModalVisible] = useState(false);
  const [entryType, setEntryType] = useState('note');
  const indicatorAnim = useRef(new Animated.Value(0)).current;

  if (!customer) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading customer data...</Text>
      </View>
    );
  }

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    Animated.spring(indicatorAnim, {
      toValue: tab === 'received' ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const handleAddEntry = (section: string) => {
    setEntryType(section === 'received' ? 'note' : 'detail');
    setModalVisible(true);
  };

  const translateX = indicatorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const handleDeleteCustomer = async () => {
    await deleteCustomer();
    router.replace('/customers');
  };

  const handleExportPdf = () => {
    if (Platform.OS === 'web') {
      generatePdf(customer);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: customer.name,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerButtons}>
              {Platform.OS === 'web' && (
                <TouchableOpacity onPress={handleExportPdf} style={styles.exportButton}>
                  <FileText size={20} color="#007AFF" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleDeleteCustomer} style={styles.trashButton}>
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => switchTab('received')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'received' && styles.activeTabText,
                ]}>
                Received
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => switchTab('details')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'details' && styles.activeTabText,
                ]}>
                Customer Details
              </Text>
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {activeTab === 'received' && (
            <>
              <CustomerSectionHeader title="Received" count={customer.received.length} />
              {customer.received.length === 0 ? (
                <View style={styles.emptySection}>
                  <Text style={styles.emptyText}>
                    No received items or communications recorded yet.
                  </Text>
                </View>
              ) : (
                customer.received.map((item, index) => (
                  <NoteItem key={item.id} note={item} index={index} />
                ))
              )}
            </>
          )}

          {activeTab === 'details' && (
            <>
              <CustomerSectionHeader title="Customer Details" count={customer.details.length} />
              {customer.details.length === 0 ? (
                <View style={styles.emptySection}>
                  <Text style={styles.emptyText}>
                    No customer details added yet.
                  </Text>
                </View>
              ) : (
                customer.details.map((item, index) => (
                  <DetailsItem key={item.id} detail={item} index={index} />
                ))
              )}
            </>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddEntry(activeTab)}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <NewEntryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={(title, content, currency) => {
            addEntry(activeTab, title, content, currency);
            setModalVisible(false);
          }}
          type={entryType}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#8E8E93',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D1D1D6',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontFamily: 'Inter-SemiBold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 2,
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptySection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    marginLeft: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportButton: {
    marginRight: 16,
    padding: 4,
  },
  trashButton: {
    marginRight: 16,
    padding: 4,
  },
});