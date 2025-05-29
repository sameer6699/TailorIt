import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Tailor } from '@/types';

interface TailorCardProps {
  tailor: Tailor;
  onPress: () => void;
}

export const TailorCard: React.FC<TailorCardProps> = ({ tailor, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: tailor.photos[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{tailor.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={Colors.light.accent} fill={Colors.light.accent} />
          <Text style={styles.rating}>
            {tailor.ratings.average.toFixed(1)} 
            <Text style={styles.ratingCount}>({tailor.ratings.count})</Text>
          </Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.light.tabIconDefault} />
          <Text style={styles.location} numberOfLines={1}>{tailor.address}</Text>
        </View>
        
        <View style={styles.specialtiesContainer}>
          {tailor.specialties.slice(0, 2).map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
          {tailor.specialties.length > 2 && (
            <View style={styles.moreSpecialtiesTag}>
              <Text style={styles.moreSpecialtiesText}>+{tailor.specialties.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
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
    marginBottom: 12,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginLeft: 4,
    flex: 1,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: Colors.light.background,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  specialtyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.primary,
  },
  moreSpecialtiesTag: {
    backgroundColor: Colors.light.background,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  moreSpecialtiesText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
});