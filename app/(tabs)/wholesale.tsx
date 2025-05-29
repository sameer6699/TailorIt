import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Search, Filter, MapPin, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { MOCK_WHOLESALE_SHOPS } from '@/data/mockData';
import { WholesaleShop } from '@/types';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'fabrics', name: 'Fabrics' },
  { id: 'threads', name: 'Threads' },
  { id: 'buttons', name: 'Buttons' },
  { id: 'zippers', name: 'Zippers' },
  { id: 'tools', name: 'Tools' },
];

export default function WholesaleScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const renderShopItem = ({ item }: { item: WholesaleShop }) => (
    <TouchableOpacity 
      style={styles.shopCard}
      onPress={() => router.push(`/wholesale/${item.id}`)}
    >
      <Image 
        source={{ uri: item.logo }} 
        style={styles.shopImage} 
      />
      
      <View style={styles.shopContent}>
        <Text style={styles.shopName}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={Colors.light.accent} fill={Colors.light.accent} />
          <Text style={styles.rating}>
            {item.ratings.average.toFixed(1)} 
            <Text style={styles.ratingCount}>({item.ratings.count})</Text>
          </Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.light.tabIconDefault} />
          <Text style={styles.location} numberOfLines={1}>{item.address}</Text>
        </View>
        
        <Text style={styles.materialsCount}>
          {item.materials.length} materials available
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wholesale Materials</Text>
      </View>
      
      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for materials, shops..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search color={Colors.light.tabIconDefault} size={20} />}
          containerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.categoryChip,
                activeCategory === item.id && styles.activeCategoryChip
              ]}
              onPress={() => setActiveCategory(item.id)}
            >
              <Text style={[
                styles.categoryChipText,
                activeCategory === item.id && styles.activeCategoryChipText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Wholesale Shops</Text>
      
      {/* Shops List */}
      <FlatList
        data={MOCK_WHOLESALE_SHOPS}
        keyExtractor={(item) => item.id}
        renderItem={renderShopItem}
        contentContainerStyle={styles.shopsList}
      />
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
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 8,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    marginBottom: 0,
  },
  searchInput: {
    borderRadius: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activeCategoryChip: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
  },
  activeCategoryChipText: {
    color: Colors.light.card,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  shopsList: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  shopCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  shopImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  shopContent: {
    flex: 1,
    padding: 12,
  },
  shopName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.text,
    marginLeft: 4,
  },
  ratingCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    marginLeft: 4,
    flex: 1,
  },
  materialsCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.accent,
  },
});