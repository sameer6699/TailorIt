import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBar } from 'expo-status-bar';
import { Scissors, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'user' | 'tailor'>('user');

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (userType === 'tailor') {
          // For tailors, just navigate to the registration form
          router.push({
            pathname: '/tailor/register',
            params: { email, fullName }
          });
        } else {
          // For regular users, proceed with signup
          await signUp(email, password, fullName, userType);
        }
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Scissors size={48} color={Colors.light.accent} />
            </View>
            <Text style={styles.logoText}>TailorIt</Text>
            <Text style={styles.tagline}>Your Perfect Tailoring Solution</Text>
          </View>

          {/* User Type Toggle - Only show when not in signup mode */}
          {isLogin && (
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  userType === 'user' && styles.activeToggleButton
                ]}
                onPress={() => setUserType('user')}
              >
                <Text style={[
                  styles.toggleButtonText,
                  userType === 'user' && styles.activeToggleButtonText
                ]}>User</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  userType === 'tailor' && styles.activeToggleButton
                ]}
                onPress={() => setUserType('tailor')}
              >
                <Text style={[
                  styles.toggleButtonText,
                  userType === 'tailor' && styles.activeToggleButtonText
                ]}>Tailor</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Show selected user type when in signup mode */}
          {!isLogin && (
            <View style={styles.selectedTypeContainer}>
              <Text style={styles.selectedTypeText}>
                Creating Account As {userType === 'user' ? 'User' : 'Tailor'}
              </Text>
            </View>
          )}

          <View style={styles.formContainer}>
            {!isLogin && (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            )}
            
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            
            {isLogin && (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
              />
            )}
            
            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <Button 
              title={isLogin ? `Log In As ${userType === 'user' ? 'User' : 'Tailor'}` : 'Next'} 
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchButton}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoBackground: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: Colors.light.primary,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
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
  selectedTypeContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  selectedTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.text,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.light.primary,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  submitButton: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.text,
  },
  switchButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.primary,
    marginLeft: 4,
  },
});