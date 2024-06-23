import { ColorTypes } from "@constants/variables";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { isArray } from "lodash";

type ErrorArea = {
  show: boolean;
  type: ColorTypes;
  message: string[] | string;
};

const initialState = {
  loading: false,
  errorArea: {
    show: false,
    type: ColorTypes.Warning,
    message: [""],
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    showErrorArea: (state, action: PayloadAction<Omit<ErrorArea, "show">>) => {
      const { type, message } = action.payload;
      state.errorArea.show = true;
      state.errorArea.type = type;
      if (isArray(message)) {
        state.errorArea.message = message;
      } else {
        state.errorArea.message = [message];
      }
    },
    resetErrorArea: (state) => {
      state.errorArea = initialState.errorArea;
    },
  },
});
const appState = (state: RootState) => state.app;

export const { showLoading, hideLoading, showErrorArea, resetErrorArea } =
  appSlice.actions;

export const appSelector = {
  loading: createSelector(appState, ({ loading }) => loading),
  errorArea: createSelector(appState, ({ errorArea }) => errorArea),
};

export default appSlice.reducer;
