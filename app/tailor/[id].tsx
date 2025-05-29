import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, ChevronRight, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { MOCK_TAILORS } from '@/data/mockData';
import { Service } from '@/types';

export default function TailorDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<'services' | 'reviews' | 'about'>('services');
  const [isFavorite, setIsFavorite] = useState(false);

  // Find tailor by id
  const tailor = MOCK_TAILORS.find(t => t.id === id);

  if (!tailor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Tailor not found</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <View style={styles.serviceCardHeader}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.servicePrice}>${item.price}</Text>
      </View>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <View style={styles.serviceFooter}>
        <View style={styles.serviceCategory}>
          <Text style={styles.serviceCategoryText}>{item.category}</Text>
        </View>
        <Text style={styles.serviceTime}>{item.estimatedTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />

      {/* Header Image */}
      <View style={styles.header}>
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
        >
          {tailor.photos.map((photo, index) => (
            <Image 
              key={index}
              source={{ uri: photo }} 
              style={styles.headerImage}
            />
          ))}
        </ScrollView>
        
        {/* Header Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              color="#FFF" 
              size={24} 
              fill={isFavorite ? '#FFF' : 'transparent'} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Overlay Info */}
        <View style={styles.overlayInfo}>
          <View style={styles.overlayRating}>
            <Star size={16} color={Colors.light.accent} fill={Colors.light.accent} />
            <Text style={styles.overlayRatingText}>
              {tailor.ratings.average.toFixed(1)} · {tailor.ratings.count} reviews
            </Text>
          </View>
        </View>
      </View>

      {/* Tailor Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.tailorName}>{tailor.name}</Text>
        
        <View style={styles.addressContainer}>
          <MapPin size={16} color={Colors.light.tabIconDefault} />
          <Text style={styles.addressText}>{tailor.address}</Text>
        </View>
        
        <View style={styles.specialtiesContainer}>
          {tailor.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.priceRangeContainer}>
          <Text style={styles.priceRangeText}>
            Price Range: ${tailor.priceRange.min} - ${tailor.priceRange.max}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'services' && styles.selectedTab]}
          onPress={() => setSelectedTab('services')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'services' && styles.selectedTabText
          ]}>Services</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'reviews' && styles.selectedTab]}
          onPress={() => setSelectedTab('reviews')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'reviews' && styles.selectedTabText
          ]}>Reviews</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'about' && styles.selectedTab]}
          onPress={() => setSelectedTab('about')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'about' && styles.selectedTabText
          ]}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {selectedTab === 'services' && (
        <FlatList
          data={tailor.services}
          keyExtractor={item => item.id}
          renderItem={renderServiceItem}
          contentContainerStyle={styles.servicesList}
        />
      )}
      
      {selectedTab === 'reviews' && (
        <View style={styles.reviewsPlaceholder}>
          <Text style={styles.placeholderText}>Reviews will be displayed here</Text>
        </View>
      )}
      
      {selectedTab === 'about' && (
        <ScrollView style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About {tailor.name}</Text>
          <Text style={styles.aboutDescription}>{tailor.description}</Text>
          
          <Text style={styles.sectionTitle}>Hours</Text>
          <View style={styles.hoursContainer}>
            <Clock size={16} color={Colors.light.tabIconDefault} />
            <Text style={styles.hoursText}>
              {tailor.availability.days.join(', ')}
              {'\n'}
              {tailor.availability.hours}
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TouchableOpacity style={styles.contactItem}>
            <Phone size={16} color={Colors.light.primary} />
            <Text style={styles.contactText}>{tailor.contact.phone}</Text>
            <ChevronRight size={16} color={Colors.light.tabIconDefault} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem}>
            <Mail size={16} color={Colors.light.primary} />
            <Text style={styles.contactText}>{tailor.contact.email}</Text>
            <ChevronRight size={16} color={Colors.light.tabIconDefault} />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button 
          title="Contact" 
          onPress={() => router.push(`/message/${tailor.id}`)}
          variant="outline"
          style={styles.contactButton}
        />
        <Button 
          title="Request Appointment" 
          onPress={() => router.push({
            pathname: '/appointment/new',
            params: { tailorId: tailor.id }
          })}
          style={styles.appointmentButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: Platform.OS === 'web' ? 400 : 360,
    height: 300,
    resizeMode: 'cover',
  },
  headerButtons: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  overlayRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  overlayRatingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 4,
  },
  infoContainer: {
    padding: 24,
  },
  tailorName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 8,
    flex: 1,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: Colors.light.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  specialtyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.primary,
  },
  priceRangeContainer: {
    marginBottom: 8,
  },
  priceRangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  selectedTabText: {
    color: Colors.light.primary,
    fontFamily: 'Inter-SemiBold',
  },
  servicesList: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
  },
  servicePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.light.primary,
  },
  serviceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceCategory: {
    backgroundColor: Colors.light.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  serviceCategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.primary,
  },
  serviceTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
  reviewsPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  aboutContainer: {
    padding: 24,
  },
  aboutTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 8,
  },
  aboutDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 12,
  },
  hoursContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  hoursText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 8,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  contactText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  contactButton: {
    flex: 1,
    marginRight: 8,
  },
  appointmentButton: {
    flex: 2,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.light.error,
    marginBottom: 16,
  },
});