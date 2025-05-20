import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Note } from '@/hooks/useCustomers';
import { useCurrencySettings } from '@/hooks/useCurrencySettings';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

interface NoteItemProps {
  note: Note;
  index: number;
}

export default function NoteItem({ note, index }: NoteItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { getCurrencySymbol } = useCurrencySettings();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = new Date(note.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity 
      style={[styles.container, { zIndex: 999 - index }]} 
      onPress={toggleExpanded}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.date}>{formattedDate} at {formattedTime}</Text>
        </View>
        <View style={styles.headerRight}>
          {note.currency && (
            <Text style={styles.currency}>
              {getCurrencySymbol(note.currency)}
            </Text>
          )}
          {expanded ? (
            <ChevronUp size={20} color="#8E8E93" />
          ) : (
            <ChevronDown size={20} color="#8E8E93" />
          )}
        </View>
      </View>
      
      {expanded && (
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{note.content}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontFamily: 'Inter-Medium',
    fontSize: 17,
    color: '#007AFF',
    marginRight: 8,
  },
  contentContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  content: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#000000',
    lineHeight: 22,
  },
});