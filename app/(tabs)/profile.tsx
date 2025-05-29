import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Settings, User, Heart, ShoppingBag, Ruler, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Button } from '@/components/ui/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'user' | 'tailor'>('user');
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  };

  const menuItems = [
    {
      title: 'My Favorites',
      icon: <Heart size={22} color={Colors.light.primary} />,
      onPress: () => router.push('/favorites'),
    },
    {
      title: 'My Orders',
      icon: <ShoppingBag size={22} color={Colors.light.primary} />,
      onPress: () => router.push('/orders'),
    },
    {
      title: 'My Measurements',
      icon: <Ruler size={22} color={Colors.light.primary} />,
      onPress: () => router.push('/measurements'),
    },
    {
      title: 'Notifications',
      icon: <Bell size={22} color={Colors.light.primary} />,
      onPress: () => router.push('/notifications'),
      badge: 3,
    },
  ];

  const settingsItems = [
    {
      title: 'Settings',
      icon: <Settings size={22} color={Colors.light.tabIconDefault} />,
      onPress: () => router.push('/settings'),
    },
    {
      title: 'Help & Support',
      icon: <HelpCircle size={22} color={Colors.light.tabIconDefault} />,
      onPress: () => router.push('/support'),
    },
    {
      title: 'Logout',
      icon: <LogOut size={22} color={Colors.light.error} />,
      onPress: () => router.replace('/(auth)'),
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      {/* User Type Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[
            styles.toggleButton,
            activeTab === 'user' && styles.activeToggleButton
          ]}
          onPress={() => setActiveTab('user')}
        >
          <Text style={[
            styles.toggleButtonText,
            activeTab === 'user' && styles.activeToggleButtonText
          ]}>User</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.toggleButton,
            activeTab === 'tailor' && styles.activeToggleButton
          ]}
          onPress={() => setActiveTab('tailor')}
        >
          <Text style={[
            styles.toggleButtonText,
            activeTab === 'tailor' && styles.activeToggleButtonText
          ]}>Tailor</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'user' ? (
          <>
            {/* User Profile Card */}
            <View style={styles.profileCard}>
              <Image 
                source={{ uri: user.avatar }} 
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            {/* Upcoming Appointment */}
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentTitle}>Upcoming Appointment</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.appointmentDetails}>
                <View style={styles.appointmentIconContainer}>
                  <Clock size={24} color={Colors.light.primary} />
                </View>
                
                <View style={styles.appointmentContent}>
                  <Text style={styles.appointmentShop}>Elite Tailoring Studio</Text>
                  <Text style={styles.appointmentService}>Suit Fitting</Text>
                  <Text style={styles.appointmentDate}>Tomorrow, 2:00 PM</Text>
                </View>
                
                <TouchableOpacity style={styles.appointmentAction}>
                  <Text style={styles.appointmentActionText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Menu Section */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Account</Text>
              
              {menuItems.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    {item.icon}
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                  </View>
                  
                  <View style={styles.menuItemRight}>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <ChevronRight size={20} color={Colors.light.tabIconDefault} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Settings Section */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Preferences</Text>
              
              {settingsItems.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    {item.icon}
                    <Text style={[
                      styles.menuItemTitle,
                      item.danger && styles.dangerText
                    ]}>{item.title}</Text>
                  </View>
                  
                  <ChevronRight size={20} color={Colors.light.tabIconDefault} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          // Tailor View - For users who are also tailors
          <View style={styles.tailorSignupContainer}>
            <User size={64} color={Colors.light.primary} />
            <Text style={styles.tailorSignupTitle}>Register as a Tailor</Text>
            <Text style={styles.tailorSignupDescription}>
              Create a tailor profile and start receiving orders from customers in your area.
            </Text>
            <Button 
              title="Register as a Tailor" 
              onPress={() => router.push('/tailor/register')} 
              style={styles.tailorSignupButton}
            />
          </View>
        )}
      </ScrollView>
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
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggleButton: {
    backgroundColor: Colors.light.primary,
  },
  toggleButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.text,
  },
  activeToggleButtonText: {
    color: Colors.light.card,
  },
  profileCard: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
  appointmentCard: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(19, 39, 67, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentShop: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  appointmentService: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  appointmentDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.light.primary,
  },
  appointmentAction: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  appointmentActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.light.card,
  },
  dangerText: {
    color: Colors.light.error,
  },
  tailorSignupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  tailorSignupTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  tailorSignupDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
    marginBottom: 32,
  },
  tailorSignupButton: {
    width: '100%',
  },
});