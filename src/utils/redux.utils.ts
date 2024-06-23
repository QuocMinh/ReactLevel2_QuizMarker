import { ColorTypes } from "@constants/variables";
import {
  hideLoading,
  resetErrorArea,
  showErrorArea,
  showLoading,
} from "@store/slices/appSlice";
import { store } from "@store/store";

export const loadingScreen = {
  show: () => {
    store.dispatch(showLoading());
  },
  hide: () => {
    store.dispatch(hideLoading());
  },
};

export const messageArea = {
  warning: (message: string | string[]) => {
    store.dispatch(
      showErrorArea({
        type: ColorTypes.Warning,
        message: message,
      })
    );
  },
  error: (message: string | string[]) => {
    store.dispatch(
      showErrorArea({
        type: ColorTypes.Danger,
        message: message,
      })
    );
  },
  success: (message: string | string[]) => {
    store.dispatch(
      showErrorArea({
        type: ColorTypes.Success,
        message: message,
      })
    );
  },
  default: (message: string | string[]) => {
    store.dispatch(
      showErrorArea({
        type: ColorTypes.Secondary,
        message: message,
      })
    );
  },
  clear: () => {
    store.dispatch(resetErrorArea());
  },
};

export type MessageAreaType = keyof typeof messageArea;
