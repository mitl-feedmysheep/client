import { isEmpty } from '@fxts/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-safearea-height';
import Toast from 'react-native-toast-message';

export async function sleep(ms: number): Promise<void> {
  new Promise(resolve => setTimeout(resolve, ms));
}

export function showToast(text: string, type: string): void {
  Toast.show({
    type,
    props: { text },
    position: 'top',
    topOffset: getStatusBarHeight() + 41,
  });
}

export async function getAsyncStorage(key: string): Promise<string | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    return safeJsonParse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function setAysncStorage(
  key: string,
  value: string | Object,
): Promise<void> {
  if (isEmpty(key) || isEmpty(value)) {
    throw new Error('[AsynStorage] key or value is empty');
  }

  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    throw new Error('[AsynStorage] setItem error');
  }
}

function safeJsonParse(str: string | null): any {
  try {
    if (isEmpty(str)) {
      return null;
    }

    return JSON.parse(str as string);
  } catch (e) {
    return str; // 파싱에 실패하면 원래 문자열 반환
  }
}
