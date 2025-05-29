import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  // Define styles based on variant and size
  const getButtonStyle = () => {
    let baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
    };
    
    if (disabled) {
      return [baseStyle, styles.disabledButton, style];
    }
    
    switch (variant) {
      case 'secondary':
        return [baseStyle, styles.secondaryButton, style];
      case 'outline':
        return [baseStyle, styles.outlineButton, style];
      case 'text':
        return [baseStyle, styles.textButton, style];
      default:
        return [baseStyle, styles.primaryButton, style];
    }
  };
  
  const getTextStyle = () => {
    let baseStyle: TextStyle = {
      ...styles.buttonText,
      ...styles[`${size}Text`],
    };
    
    if (disabled) {
      return [baseStyle, styles.disabledText, textStyle];
    }
    
    switch (variant) {
      case 'secondary':
        return [baseStyle, styles.secondaryText, textStyle];
      case 'outline':
        return [baseStyle, styles.outlineText, textStyle];
      case 'text':
        return [baseStyle, styles.textOnlyText, textStyle];
      default:
        return [baseStyle, styles.primaryText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? Colors.light.background : Colors.light.primary} 
        />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: Colors.light.border,
    borderColor: Colors.light.border,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: Colors.light.primary,
  },
  textOnlyText: {
    color: Colors.light.primary,
  },
  disabledText: {
    color: '#AAAAAA',
  },
});