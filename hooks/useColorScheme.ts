import { useState, useEffect } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  const nativeColorScheme = useNativeColorScheme();
  const [colorScheme, setColorScheme] = useState(nativeColorScheme);

  useEffect(() => {
    setColorScheme(nativeColorScheme);
  }, [nativeColorScheme]);

  return colorScheme;
}