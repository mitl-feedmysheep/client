import { getStatusBarHeight } from 'react-native-safearea-height';
import Toast from 'react-native-toast-message';

export enum ToastEnumType {
  SUCCESS = 'sucess',
  ERROR = 'error',
  INFO = 'info',
}

export const showToast = (text: string, type: ToastEnumType) => {
  Toast.show({
    type,
    props: { text },
    position: 'top',
    topOffset: getStatusBarHeight() + 41,
  });
};
