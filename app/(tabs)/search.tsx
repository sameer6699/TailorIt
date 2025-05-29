import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Search, MapPin, FileSliders as Sliders, Map as MapIcon } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { TailorCard } from '@/components/tailor/TailorCard';
import { MOCK_TAILORS } from '@/data/mockData';

const filters = [
  { id: 'all', name: 'All' },
  { id: 'nearby', name: 'Nearby' },
  { id: 'top-rated', name: 'Top Rated' },
  { id: 'men', name: 'Men' },
  { id: 'women', name: 'Women' },
  { id: 'wedding', name: 'Wedding' },
];

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(params.category?.toString() || 'all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Filter tailors based on the active filter
  const filteredTailors = MOCK_TAILORS.filter(tailor => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'nearby') return true; // In a real app, filter by distance
    if (activeFilter === 'top-rated') return tailor.ratings.average >= 4.5;
    
    // Filter by category/specialty
    return tailor.specialties.some(s => 
      s.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Tailors</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            style={[
              styles.viewToggleButton, 
              viewMode === 'list' && styles.viewToggleButtonActive
            ]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[
              styles.viewToggleText,
              viewMode === 'list' && styles.viewToggleTextActive
            ]}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.viewToggleButton, 
              viewMode === 'map' && styles.viewToggleButtonActive
            ]}
            onPress={() => setViewMode('map')}
          >
            <MapIcon 
              size={16} 
              color={viewMode === 'map' ? Colors.light.primary : Colors.light.tabIconDefault} 
            />
            <Text style={[
              styles.viewToggleText,
              viewMode === 'map' && styles.viewToggleTextActive
            ]}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search tailors, services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search color={Colors.light.tabIconDefault} size={20} />}
          containerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Sliders size={20} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter.id}
            style={[
              styles.filterChip,
              activeFilter === filter.id && styles.activeFilterChip
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text style={[
              styles.filterChipText,
              activeFilter === filter.id && styles.activeFilterChipText
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Location */}
      <View style={styles.locationContainer}>
        <MapPin size={16} color={Colors.light.primary} />
        <Text style={styles.locationText}>New York, NY</Text>
        <TouchableOpacity>
          <Text style={styles.changeLocationText}>Change</Text>
        </TouchableOpacity>
      </View>
      
      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredTailors.length} tailors found
        </Text>
      </View>
      
      {/* Tailors List */}
      {viewMode === 'list' ? (
        <FlatList
          data={filteredTailors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TailorCard 
              tailor={item}
              onPress={() => router.push(`/tailor/${item.id}`)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.tailorsList}
        />
      ) : (
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>Map view would be displayed here</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  viewToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewToggleButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  viewToggleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    marginLeft: 4,
  },
  viewToggleTextActive: {
    color: Colors.light.card,
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activeFilterChip: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
  },
  activeFilterChipText: {
    color: Colors.light.card,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.primary,
    marginLeft: 4,
  },
  changeLocationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.accent,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  resultsContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  resultsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  tailorsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EEF4',
    margin: 24,
    borderRadius: 16,
  },
  mapPlaceholder: {
    fontFamily: 'Inter-Medium',
    color: Colors.light.tabIconDefault,
  },
});