import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Search } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';

// Mock conversation data
const CONVERSATIONS = [
  {
    id: '1',
    name: 'Elite Tailoring Studio',
    avatar: 'https://images.pexels.com/photos/3772509/pexels-photo-3772509.jpeg',
    lastMessage: 'Your appointment has been confirmed for tomorrow at 2:00 PM.',
    timestamp: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Bella Couture',
    avatar: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg',
    lastMessage: 'We\'ve received your measurement details. When would you like to schedule a fitting?',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Quick Stitch Alterations',
    avatar: 'https://images.pexels.com/photos/4467735/pexels-photo-4467735.jpeg',
    lastMessage: 'Your alterations are ready for pickup. Our shop is open until 8 PM today.',
    timestamp: '2 days ago',
    unread: 0,
  },
  {
    id: '4',
    name: 'Traditional Crafts Tailoring',
    avatar: 'https://images.pexels.com/photos/6567739/pexels-photo-6567739.jpeg',
    lastMessage: 'Thank you for your order! We\'ll start working on your traditional outfit next week.',
    timestamp: '1 week ago',
    unread: 0,
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const renderConversationItem = ({ item }: { item: typeof CONVERSATIONS[0] }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => router.push(`/message/${item.id}`)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.timestamp}</Text>
        </View>
        
        <Text 
          style={[
            styles.conversationMessage,
            item.unread > 0 && styles.unreadMessage
          ]}
          numberOfLines={2}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search color={Colors.light.tabIconDefault} size={20} />}
          containerStyle={styles.searchInputContainer}
        />
      </View>
      
      {/* Conversations List */}
      {CONVERSATIONS.length > 0 ? (
        <FlatList
          data={CONVERSATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderConversationItem}
          contentContainerStyle={styles.conversationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptyDescription}>
            Your conversations with tailors will appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  searchInputContainer: {
    marginBottom: 0,
  },
  conversationsList: {
    paddingHorizontal: 24,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  unreadBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: Colors.light.card,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
  },
  conversationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
  conversationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  unreadMessage: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.light.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
  },
});