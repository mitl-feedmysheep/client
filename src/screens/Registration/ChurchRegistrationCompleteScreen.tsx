import CongratsSvg from '@assets/images/congrats.svg';
import AppNameSvg from '@assets/splash/app-name.svg';
import { RoundButton } from '@components/buttons/RoundButton';
import { EmptyArea } from '@components/common/EmptyArea';
import Typo from '@components/common/Typo';
import React from 'react';
import { styled } from 'styled-components/native';

type Props = {};

export const ChurchRegistrationCompleteScreen: React.FC<Props> = ({
  navigation,
}) => {
  return (
    <Container>
      <AvoidingView>
        <InnnerContainer>
          <EmptyArea height={42} />
          <AppNameSvg />
          <EmptyArea height={42} />
          <CongratsSvg />
          <Typo type="B2" textAlign="center">
            {`교회등록이 완료되었어요!\n이제 피마쉽을 이용할 수 있어요`}
          </Typo>
          <EmptyArea height={40} />
        </InnnerContainer>
        <ButtonContainer>
          <RoundButton
            onPress={() => {
              navigation.goBack();
            }}
            buttonText="피마쉽 구경하기"
            isActived={true}
          />
        </ButtonContainer>
      </AvoidingView>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: white;
`;

const AvoidingView = styled.ScrollView`
  display: flex;
  flex: 1;
`;

const InnnerContainer = styled.View`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ButtonContainer = styled.View`
  margin-horizontal: 24px;
`;
