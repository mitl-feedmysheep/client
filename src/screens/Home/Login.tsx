import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@stack-types/screenStackParams';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = () => {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
};
