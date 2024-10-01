import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  Home: undefined;
};

// 네비게이션 prop 타입 정의
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Props 타입 정의
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

// Stack navigator 생성
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.ReactElement {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* 여기에 더 많은 스크린을 추가할 수 있습니다 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
