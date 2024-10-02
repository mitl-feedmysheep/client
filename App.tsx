import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types/screenStackParams';

import React from 'react';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
