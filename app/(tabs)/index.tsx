import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, MapPin, Star, Filter } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TailorCard } from '@/components/tailor/TailorCard';
import { CategoryButton } from '@/components/ui/CategoryButton';
import { FeaturedTailor } from '@/components/tailor/FeaturedTailor';
import { MOCK_TAILORS } from '@/data/mockData';

const categories = [
  { id: '1', name: 'Men\'s Suits', icon: '👔' },
  { id: '2', name: 'Women\'s Dresses', icon: '👗' },
  { id: '3', name: 'Alterations', icon: '✂️' },
  { id: '4', name: 'Wedding', icon: '💍' },
  { id: '5', name: 'Uniforms', icon: '👮' },
  { id: '6', name: 'Traditional', icon: '👘' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock user location
  const userLocation = "New York, NY";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Alex</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search for tailors or services"
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

        {/* Location */}
        <View style={styles.locationContainer}>
          <MapPin size={16} color={Colors.light.primary} />
          <Text style={styles.locationText}>{userLocation}</Text>
          <TouchableOpacity>
            <Text style={styles.changeLocationText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Tailor */}
        <FeaturedTailor tailor={MOCK_TAILORS[0]} />

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <CategoryButton 
              key={category.id}
              title={category.name}
              icon={category.icon}
              onPress={() => router.push({
                pathname: '/(tabs)/search',
                params: { category: category.id }
              })}
            />
          ))}
        </ScrollView>

        {/* Nearby Tailors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Tailors</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tailorsList}>
          {MOCK_TAILORS.slice(0, 4).map((tailor) => (
            <TailorCard 
              key={tailor.id}
              tailor={tailor}
              onPress={() => router.push(`/tailor/${tailor.id}`)}
            />
          ))}
        </View>

        {/* Top Rated */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tailorsList}>
          {MOCK_TAILORS.slice(2, 6).map((tailor) => (
            <TailorCard 
              key={tailor.id}
              tailor={tailor}
              onPress={() => router.push(`/tailor/${tailor.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.tabIconDefault,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.light.accent,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  tailorsList: {
    paddingHorizontal: 24,
  },
});