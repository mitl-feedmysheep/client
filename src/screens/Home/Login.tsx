import { signIn } from '@apis/mutations/login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@stack-types/screenStackParams';

import { useMemo, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAbleToLogin = useMemo(
    () => Boolean(email.length && password.length),
    [email, password],
  );

  const handleLogin = async () => {
    const response = await signIn(email, password);
    if (response) {
      navigation.navigate('Home');
    }
  };

  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: white;
`;
