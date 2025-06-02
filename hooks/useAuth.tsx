import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

type UserType = 'user' | 'tailor';

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  tailorProfile?: {
    businessName?: string;
    address?: string;
    specialties?: string[];
    services?: string[];
    priceRange?: string;
    experience?: number;
    certifications?: string[];
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, userType: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  updateTailorProfile: (profile: User['tailorProfile']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // TODO: Implement actual auth state check
      setIsLoading(false);
    } catch (error) {
      console.error('Auth state check failed:', error);
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual sign in
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'Demo User',
        userType: 'user'
      };
      setUser(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: UserType) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual sign up
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: '1',
        email,
        fullName,
        userType
      };
      setUser(mockUser);
      
      if (userType === 'tailor') {
        router.push('/tailor/register');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual sign out
      setUser(null);
      router.replace('/');
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTailorProfile = async (profile: User['tailorProfile']) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual profile update
      if (user) {
        setUser({
          ...user,
          tailorProfile: profile
        });
      }
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateTailorProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 