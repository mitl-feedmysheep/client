import { isEmpty } from '@fxts/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-safearea-height';
import Toast from 'react-native-toast-message';

export const sleep = async (ms: number): Promise<void> => {
  new Promise(resolve => setTimeout(resolve, ms));
};

export const showToast = (text: string, type: string): void => {
  Toast.show({
    type,
    props: { text },
    position: 'top',
    topOffset: getStatusBarHeight() + 41,
  });
};

export const getAsyncStorage = async (key: string): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return safeJsonParse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setAsyncStorage = async (
  key: string,
  value: string | Object,
): Promise<void> => {
  if (isEmpty(key) || isEmpty(value)) {
    throw new Error('[AsyncStorage] key or value is empty');
  }

  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    throw new Error('[AsyncStorage] setItem error');
  }
};

const safeJsonParse = (str: string | null): any => {
  try {
    if (isEmpty(str)) {
      return null;
    }

    return JSON.parse(str as string);
  } catch (e) {
    return str; // Return the original string if parsing fails
  }
};
