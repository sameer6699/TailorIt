import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, KeyboardTypeOptions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}

interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
}

const steps: FormStep[] = [
  {
    id: 'account',
    title: 'Create Account',
    fields: [
      { name: 'password', label: 'Password', placeholder: 'Enter your password', keyboardType: 'default' },
      { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm your password', keyboardType: 'default' },
    ]
  },
  {
    id: 'business',
    title: 'Business Information',
    fields: [
      { name: 'businessName', label: 'Business Name', placeholder: 'Enter your business name' },
      { name: 'address', label: 'Business Address', placeholder: 'Enter your business address' },
      { name: 'specialties', label: 'Specialties', placeholder: 'Enter your specialties (comma separated)' },
    ]
  },
  {
    id: 'services',
    title: 'Services & Pricing',
    fields: [
      { name: 'services', label: 'Services Offered', placeholder: 'List your services (comma separated)' },
      { name: 'priceRange', label: 'Price Range', placeholder: 'Enter your price range (e.g., $50-$200)' },
      { name: 'availability', label: 'Working Hours', placeholder: 'Enter your working hours' },
    ]
  },
  {
    id: 'verification',
    title: 'Verification',
    fields: [
      { name: 'experience', label: 'Years of Experience', placeholder: 'Enter years of experience', keyboardType: 'numeric' },
      { name: 'certifications', label: 'Certifications', placeholder: 'List your certifications (comma separated)' },
      { name: 'portfolio', label: 'Portfolio Link', placeholder: 'Enter your portfolio website (optional)' },
    ]
  }
];

export default function TailorRegisterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { signUp, updateTailorProfile, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    email: params.email as string,
    fullName: params.fullName as string,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      // Validate passwords
      if (formData.password !== formData.confirmPassword) {
        // TODO: Show error message
        console.error('Passwords do not match');
        return;
      }
      // Create account
      try {
        await signUp(formData.email, formData.password, formData.fullName, 'tailor');
      } catch (error) {
        console.error('Account creation failed:', error);
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    try {
      const profile = {
        businessName: formData.businessName,
        address: formData.address,
        specialties: formData.specialties?.split(',').map(s => s.trim()),
        services: formData.services?.split(',').map(s => s.trim()),
        priceRange: formData.priceRange,
        experience: parseInt(formData.experience || '0'),
        certifications: formData.certifications?.split(',').map(s => s.trim()),
      };
      
      await updateTailorProfile(profile);
    } catch (error) {
      console.error('Profile update failed:', error);
      // TODO: Show error message to user
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tailor Registration</Text>
        <View style={styles.backButton} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill,
              { width: `${progress}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {steps.length}
        </Text>
      </View>

      {/* Form Steps */}
      <ScrollView 
        style={styles.formContainer}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={currentStep}
          entering={SlideInRight}
          exiting={SlideOutLeft}
          style={styles.stepContainer}
        >
          <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
          
          {steps[currentStep].fields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChangeText={(value) => handleInputChange(field.name, value)}
              keyboardType={field.keyboardType}
              secureTextEntry={field.name.includes('password')}
              style={styles.input}
            />
          ))}
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title={currentStep === steps.length - 1 ? 'Complete Registration' : 'Next Step'}
          onPress={handleNext}
          loading={isLoading}
          style={styles.submitButton}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.light.text,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.light.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.light.tabIconDefault,
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 16,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.light.text,
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  submitButton: {
    width: '100%',
  },
}); 