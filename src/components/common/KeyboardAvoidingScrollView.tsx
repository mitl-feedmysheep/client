import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingViewProps,
  Platform,
  ScrollViewProps,
} from 'react-native';
import { styled } from 'styled-components/native';

interface Props {
  children?: ReactNode;
  keyboardAvoidingProps?: KeyboardAvoidingViewProps;
  scrollProps?: ScrollViewProps;
}

export const KeyboardAvoidingScrollView: React.FC<Props> = ({
  children,
  keyboardAvoidingProps,
  scrollProps,
}) => {
  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      {...keyboardAvoidingProps}>
      <Scroll {...scrollProps}>{children}</Scroll>
    </Container>
  );
};

const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
`;

const Scroll = styled.ScrollView`
  display: flex;
  flex: 1;
`;
