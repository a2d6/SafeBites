import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'Fredoka': Fredoka_400Regular,
    'Fredoka-Medium': Fredoka_500Medium,
    'Fredoka-Bold': Fredoka_600SemiBold,
  });

  return fontsLoaded;
}; 