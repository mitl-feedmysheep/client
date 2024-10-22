import Typo from '@components/common/Typo';
import { colorSet } from '@constants/colorSet';
import styled from 'styled-components/native';

const toastConfig = {
  successToast: ({ props }) => {
    const { text } = props;

    return (
      <ToastContainer color={colorSet.primary.P2}>
        <Typo type="caption" color={colorSet.primary.P6}>
          {text}
        </Typo>
      </ToastContainer>
    );
  },
  errorToast: ({ props }) => {
    const { text } = props;

    return (
      <ToastContainer color={colorSet.accentError.W2}>
        <Typo type="caption" color={colorSet.accentError.W5} textAlign="center">
          {text}
        </Typo>
      </ToastContainer>
    );
  },
};

const ToastContainer = styled.View`
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ color }) => color};
`;
