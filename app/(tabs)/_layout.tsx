import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { UserPlus, Users, Search, Settings } from 'lucide-react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#D1D1D6',
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: 4,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 0.5,
          borderBottomColor: '#D1D1D6',
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="customers/index"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          tabBarLabel: 'Customers',
        }}
      />
      <Tabs.Screen
        name="new-customer/index"
        options={{
          title: 'New Customer',
          tabBarIcon: ({ color, size }) => <UserPlus size={size} color={color} />,
          tabBarLabel: 'New',
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
          tabBarLabel: 'Search',
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}