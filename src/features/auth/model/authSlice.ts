import { createSlice } from '@reduxjs/toolkit';
import { login, loginCrm, register } from '../api/authThunk';
import { GlobalError, User, ValidationError } from './authTypes';
import { RootState } from '../../../app/store/store';

interface UsersState {
  user: User | null;
  userCrm: User | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  userCrm: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = null;
    },
    logoutCrmState: (state) => {
      state.userCrm = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: data }) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: data }) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = true;
      state.loginError = error || null;
    });
    builder.addCase(loginCrm.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(loginCrm.fulfilled, (state, { payload: data }) => {
      state.loginLoading = false;
      state.userCrm = data.user;
    });
    builder.addCase(loginCrm.rejected, (state, { payload: error }) => {
      state.loginLoading = true;
      state.loginError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { logoutState, logoutCrmState } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectUserCrm = (state: RootState) => state.users.userCrm;

export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
