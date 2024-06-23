import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState = {
  loading: false,
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
  },
});
const appState = (state: RootState) => state.app;

export const { showLoading, hideLoading } = appSlice.actions;

export const appSelector = {
  loading: createSelector(appState, (app) => app.loading),
};

export default appSlice.reducer;
