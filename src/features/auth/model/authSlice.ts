import { createSlice } from '@reduxjs/toolkit';
import { login } from '../api/authThunk';
import { GlobalError, User } from './authTypes';
import { RootState } from '../../../app/store/store';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
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
  },
  extraReducers: (builder) => {
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
  },
});

export const usersReducer = usersSlice.reducer;

export const { logoutState } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;

export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
