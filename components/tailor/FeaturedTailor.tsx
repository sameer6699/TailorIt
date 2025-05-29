import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { Tailor } from '@/types';

interface FeaturedTailorProps {
  tailor: Tailor;
}

export const FeaturedTailor: React.FC<FeaturedTailorProps> = ({ tailor }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => router.push(`/tailor/${tailor.id}`)}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: tailor.photos[0] }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Featured</Text>
              </View>
            </View>
            
            <View>
              <Text style={styles.name}>{tailor.name}</Text>
              
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.light.accent} fill={Colors.light.accent} />
                <Text style={styles.rating}>
                  {tailor.ratings.average.toFixed(1)} 
                  <Text style={styles.ratingCount}>({tailor.ratings.count} reviews)</Text>
                </Text>
              </View>
              
              <View style={styles.specialtiesContainer}>
                {tailor.specialties.slice(0, 3).map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  background: {
    flex: 1,
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  badge: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#000',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 22,
    color: '#FFF',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 4,
  },
  ratingCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  specialtyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFF',
  },
});