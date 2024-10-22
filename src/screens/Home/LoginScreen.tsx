import { useSignInMutation } from '@apis/mutations/login';
import { MainButton } from '@components/buttons/MainButton';
import { EmptyArea } from '@components/common/EmptyArea';
import { Header } from '@components/common/Header';
import Typo from '@components/common/Typo';
import { CustomTextInput } from '@components/textInput/CustomTextInput';
import { colorSet } from '@constants/colorSet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@stack-types/screenStackParams';
import { validateEmail } from '@utils/utils';
import { useMemo, useState } from 'react';
import styled from 'styled-components/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { mutate: signInMutation } = useSignInMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAbleToLogin = useMemo(
    () => Boolean(email.length && password.length),
    [email, password],
  );

  const handleLogin = async () => {
    signInMutation(
      { email, password },
      {
        onSuccess: data => {
          navigation.navigate('Home');
        },
        onError: error => {
          console.log(error);
        },
      },
    );
  };

  return (
    <Container>
      <AvoidingView stickyHeaderIndices={[0]}>
        <Header title="로그인" />
        <InnerContainer>
          <EmptyArea height={170} />
          <CustomTextInput
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
            placeholder="이메일 주소 입력"
            keyboardType="email-address"
            validate={validateEmail}
            validateText="이메일 형식에 맞지 않아요."
          />
          <EmptyArea height={12} />
          <CustomTextInput
            isPassword
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
            }}
            placeholder="비밀번호 입력"
            keyboardType="email-address"
          />
          <EmptyArea height={12} />
          <SearchContainer>
            <SearchWrapper activeOpacity={1}>
              <SearchText>이메일 찾기</SearchText>
            </SearchWrapper>
            <VerticalLine />
            <SearchWrapper activeOpacity={1}>
              <SearchText>비밀번호 찾기</SearchText>
            </SearchWrapper>
          </SearchContainer>
          <EmptyArea height={32} />
          <MainButton
            buttonText="로그인"
            isActived={isAbleToLogin}
            activeType="active"
            onPress={handleLogin}
          />
          <EmptyArea height={12} />
          <SignupContainer>
            <SignupText1>계정이 없으신가요? </SignupText1>
            <SignupButton
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <SignupText2>회원가입하기</SignupText2>
            </SignupButton>
          </SignupContainer>
        </InnerContainer>
      </AvoidingView>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const AvoidingView = styled.ScrollView`
  flex: 1;
`;

const InnerContainer = styled.View`
  margin-horizontal: 24px;
  flex: 1;
`;

const SignupContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SignupText1 = styled.Text`
  color: #636663;
  font-family: Pretendard-Light;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SignupText2 = styled.Text`
  color: #636663;
  font-family: Pretendard-SemiBold;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SignupButton = styled.TouchableOpacity``;

const BibleContainer = styled.View`
  display: inline-flex;
  padding: 25px 44.5px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.75px;
  border-color: ${colorSet.primary.P4_M};
  background-color: white;
`;

const BibleText = styled(Typo)`
  text-align: center;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const SearchWrapper = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: #636663;
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 12px;
  background-color: #afb2af;
`;

const SearchText = styled.Text`
  color: #636663;
  font-family: Pretendard-Light;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
