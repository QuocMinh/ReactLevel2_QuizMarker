import { showLoading, hideLoading } from "@store/slices/appSlice";
import { store } from "@store/store";

export const loadingScreen = {
  show: () => {
    store.dispatch(showLoading());
  },

  hide: () => {
    store.dispatch(hideLoading());
  },
};
